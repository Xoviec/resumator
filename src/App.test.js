import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(
    /Welcome to the Frontmen Resumator, a tool to generate Resumes/i
  )
  expect(linkElement).toBeInTheDocument()
})
