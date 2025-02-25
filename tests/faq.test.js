// Load the HTML content for testing
const html = `
  <div>
    <div class="faq">
      <div class="question">Question 1</div>
      <div class="answer-box">Answer 1</div>
    </div>
    <div class="faq">
      <div class="question">Question 2</div>
      <div class="answer-box">Answer 2</div>
    </div>
  </div>
`;

// Add necessary CSS for the animations and transitions
const style = document.createElement('style');
style.textContent = `
  .faq .answer-box {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
  }
  .faq.active .answer-box {
    opacity: 1;
    max-height: 500px;
    margin-top: 20px;
  }
`;
document.head.appendChild(style);

document.body.innerHTML = html;

// Mock setTimeout for tests
jest.useFakeTimers();

require('../src/views/main/js/faq.js');

describe('FAQ Toggle', () => {
  let faqElements;

  beforeEach(() => {
    // Reset all FAQ elements to the initial state:
    faqElements = document.querySelectorAll('.faq');
    faqElements.forEach((faq) => {
      faq.classList.remove('active');
      const answer = faq.querySelector('.answer-box');
      answer.style.opacity = "0";
      answer.style.marginTop = "0";
    });
    jest.clearAllTimers();
  });

  /**
   * Test Case: Clicking on an FAQ should open it.
   * Expected Behavior: The FAQ gets the "active" class, 
   * and the answer box has opacity set to 1.
   */
  test('opens an FAQ when clicked', () => {
    const firstFaq = faqElements[0];
    const answerBox = firstFaq.querySelector('.answer-box');

    firstFaq.click();
    
    // Run all the pending timers to make sure animations complete
    jest.runAllTimers();

    expect(firstFaq.classList.contains('active')).toBe(true);
    expect(answerBox.style.opacity).toBe('1');
    expect(answerBox.style.marginTop).toBe('20px');
  });

  /**
   * Test Case: Clicking the same FAQ twice should close it.
   * Expected Behavior: The FAQ loses the "active" class, 
   * and the answer box has opacity set to 0.
   */
  test('closes an FAQ when clicked twice', () => {
    const firstFaq = faqElements[0];
    const answerBox = firstFaq.querySelector('.answer-box');

    // First click to open
    firstFaq.click();
    jest.runAllTimers();
    
    // Second click to close
    firstFaq.click();
    jest.runAllTimers();

    expect(firstFaq.classList.contains('active')).toBe(false);
    expect(answerBox.style.opacity).toBe('0');
    expect(answerBox.style.marginTop).toBe('0px');
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

    // Open first FAQ
    firstFaq.click();
    jest.runAllTimers();
    
    expect(firstFaq.classList.contains('active')).toBe(true);
    expect(firstAnswer.style.opacity).toBe('1');

    // Open second FAQ
    secondFaq.click();
    jest.runAllTimers();
    
    expect(secondFaq.classList.contains('active')).toBe(true);
    expect(secondAnswer.style.opacity).toBe('1');

    // First FAQ should now be closed
    expect(firstFaq.classList.contains('active')).toBe(false);
    expect(firstAnswer.style.opacity).toBe('0');
  });
});