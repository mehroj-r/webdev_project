// Load the HTML content for testing
const html = `
  <div>
    <div class="faq">
      <div class="question">Question 1</div>
      <div class="answer-box" style="display: none;">Answer 1</div>
    </div>
    <div class="faq">
      <div class="question">Question 2</div>
      <div class="answer-box" style="display: none;">Answer 2</div>
    </div>
  </div>
`;

document.body.innerHTML = html;

require('../src/views/main/js/faq.js');

describe('FAQ Toggle', () => {
  let faqElements;

  beforeEach(() => {
    // Reset all FAQ elements to the initial state:
    faqElements = document.querySelectorAll('.faq');
    faqElements.forEach((faq) => {
      faq.classList.remove('active');
      const answer = faq.querySelector('.answer-box');
      answer.style.display = 'none';
    });
  });

  /**
   * Test Case: Clicking on an FAQ should open it.
   * Expected Behavior: The FAQ gets the "active" class, 
   * and the answer box becomes visible.
   */

  test('opens an FAQ when clicked', () => {
    const firstFaq = faqElements[0];
    const answerBox = firstFaq.querySelector('.answer-box');

    firstFaq.click();

    expect(firstFaq.classList.contains('active')).toBe(true);
    expect(getComputedStyle(answerBox).display).toBe('block'); 
  });

  /**
   * Test Case: Clicking the same FAQ twice should close it.
   * Expected Behavior: The FAQ loses the "active" class, 
   * and the answer box becomes hidden again.
   */

  test('closes an FAQ when clicked twice', () => {
    const firstFaq = faqElements[0];
    const answerBox = firstFaq.querySelector('.answer-box');

    firstFaq.click();
    firstFaq.click();

    expect(firstFaq.classList.contains('active')).toBe(false);
    expect(getComputedStyle(answerBox).display).toBe('none'); 
  });

  /**
   * Test Case: Only one FAQ should remain open at a time.
   * Expected Behavior: Clicking one FAQ should close any previously opened FAQ.
   */

  test('only one FAQ remains open at a time', () => {
    const firstFaq = faqElements[0];
    const secondFaq = faqElements[1];
    const firstAnswer = firstFaq.querySelector('.answer-box');
    const secondAnswer = secondFaq.querySelector('.answer-box');

    firstFaq.click();
    expect(firstFaq.classList.contains('active')).toBe(true);
    expect(getComputedStyle(firstAnswer).display).toBe('block');

    secondFaq.click();
    expect(secondFaq.classList.contains('active')).toBe(true);
    expect(getComputedStyle(secondAnswer).display).toBe('block');

    expect(firstFaq.classList.contains('active')).toBe(false);
    expect(getComputedStyle(firstAnswer).display).toBe('none');
  });
});
