/**
 * @jest-environment jsdom
 */
import { fireEvent, screen, waitFor } from '@testing-library/dom';

// Set up fake timers for testing setTimeout behavior.
jest.useFakeTimers();

// Helper function: simulate DOMContentLoaded event.
function triggerDOMContentLoaded() {
  document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
}

// Helper function: simulate window.onload event.
function triggerWindowLoad() {
  window.dispatchEvent(new Event('load'));
}

describe('Main.js functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="locationBtn">Show Location</button>
      <div id="locationModal" class="hidden" data-testid="locationModal">
        Location Modal
      </div>
      <a href="services.html" class="nav-link" data-page="services">Services</a>
      <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
    `;

    delete window.location;
    window.location = { pathname: '/services.html', hash: '' };

    console.clear();

    require('../src/views/main/js/main.js');

    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetModules();
  });
 /**  
   Test 1: Check that clicking the location button shows the modal,
   and then after 2 seconds, the modal is hidden.
   **/

  test('shows the location modal when the location button is clicked and then hides after timeout', async () => {
    const locationBtn = document.getElementById('locationBtn');
    const locationModal = document.getElementById('locationModal');
  
    expect(locationModal.classList.contains('hidden')).toBe(true);
    fireEvent.click(locationBtn);
    await waitFor(() => expect(locationModal.classList.contains('hidden')).toBe(false));
    fireEvent.mouseLeave(locationModal);
    jest.advanceTimersByTime(2000);
    await waitFor(() => expect(locationModal.classList.contains('hidden')).toBe(true));
  });
  
  // Test 2: Verify that if the mouse is over the modal, the auto-hide timer is canceled.

  test('keeps the location modal visible when the mouse is over it', async () => {
    const locationBtn = document.getElementById('locationBtn');
    const locationModal = document.getElementById('locationModal');
    fireEvent.click(locationBtn);
    await waitFor(() => expect(locationModal.classList.contains('hidden')).toBe(false));
    fireEvent.mouseEnter(locationModal);
    jest.advanceTimersByTime(2000);
    expect(locationModal.classList.contains('hidden')).toBe(false);
    fireEvent.mouseLeave(locationModal);
    jest.advanceTimersByTime(2000);
    await waitFor(() => expect(locationModal.classList.contains('hidden')).toBe(true));
  });

  /**Test 3: Ensure that the correct navigation link gets the "active" class
   based on the current page (derived from window.location.pathname).**/

  test('sets the active class on the current page link', () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.dataset.page === 'services') {
        expect(link.classList.contains('active')).toBe(true);
      } else {
        expect(link.classList.contains('active')).toBe(false);
      }
    });
  });

  // Test 4: Verify that when there is a hash in the URL, the page scrolls to the target element.

  test('scrolls to the correct element when the hash is set in the URL', () => {
    document.body.innerHTML += `<div id="targetElement">Target Element</div>`;
    window.location.hash = '#targetElement';
    const targetElement = document.querySelector('#targetElement');
    targetElement.scrollIntoView = jest.fn();
    triggerWindowLoad();
    jest.advanceTimersByTime(150);

    expect(targetElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    });
  });
});
