import "@testing-library/jest-dom";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe("Main Entry Point", () => {
  beforeEach(() => {
    const root = document.createElement("div");

    root.id = "root";

    document.body.appendChild(root);
  });

  afterEach(() => {
    const root = document.getElementById("root");

    if (root) {
      document.body.removeChild(root);
    }
  });

  it("renders the App component without crashing", () => {
    require("./main");

    const root = document.getElementById("root");
    
    expect(root).toBeInTheDocument();
  });
});
