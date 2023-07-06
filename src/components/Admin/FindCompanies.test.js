import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FindCompanies from "./FindCompanies";



test("should render the search input", () => {
  render(<FindCompanies />);
  const searchInput = screen.getByPlaceholderText("Search");
  expect(searchInput).toBeInTheDocument();
});

test("should update the company list when searching", () => {
  render(<FindCompanies />);
  const searchInput = screen.getByPlaceholderText("Search");
  
  fireEvent.change(searchInput, { target: { value: "searchTerm" } });
  
  // Mock the response from the API
  const mockCompanyList = [
    { id: 1, name: "Company A", country: "Country A", category: "Category A" },
    { id: 2, name: "Company B", country: "Country B", category: "Category B" },
  ];
  
  // Set the response data to the mocked company list
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ exportProducts: { data: mockCompanyList } }),
  });
  
  // Wait for the debounce timeout to complete
  setTimeout(() => {
    const companyRows = screen.getAllByRole("row");
    
    // The company list should have two rows (header row + 2 company rows)
    expect(companyRows.length).toBe(3);
    
    // Assert the values in the company rows
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
    expect(screen.getByText("Country A")).toBeInTheDocument();
    expect(screen.getByText("Country B")).toBeInTheDocument();
    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
  }, 600);
});
