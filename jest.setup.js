Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    })),
});
  
global.console = {
    ...console,
    log: jest.fn(), // Suppress console.log
    info: jest.fn(), // Suppress console.info
    warn: console.warn, // Keep warnings visible
    error: console.error, // Keep errors visible
};
  