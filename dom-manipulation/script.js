// script.test.js
import postQuoteToServer from './script';

// Mocking fetch API for POST
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 101, text: 'This is a new quote' }),
  })
);

test('postQuoteToServer posts a new quote and returns the response', async () => {
  const newQuote = { text: 'This is a new quote' };
  const result = await postQuoteToServer(newQuote);
  expect(result).toEqual({ id: 101, text: 'This is a new quote' });
});

test('postQuoteToServer handles errors on failure', async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));
  const newQuote = { text: 'This is a new quote' };
  const result = await postQuoteToServer(newQuote);
  expect(result).toBeNull();  // Check that null is returned on error
});
