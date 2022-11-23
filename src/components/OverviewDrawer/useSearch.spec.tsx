import { render, screen } from "@testing-library/react";
import { VoidFunctionComponent } from "react";
import { ResumeModel } from "../LivePreviewerComponents/ResumeModel";
import { useSearch } from "./useSearch";

const data = [
  {
    id: "1",
    isArchived: true,
    skills: [{ name: "react" }],
    personalia: { firstName: "He-man", lastName: "Master of the Universe" },
    experience: [],
    projects: [],
  },
  {
    id: "2",
    isArchived: true,
    skills: [{ name: "angular" }],
    personalia: { firstName: "Skeletor", lastName: "of Grayskull" },
    experience: [],
    projects: [],
  },
  {
    id: "3",
    isArchived: false,
    skills: [{ name: "react" }],
    personalia: { firstName: "Orko", lastName: "Ghost" },
    experience: [],
    projects: [],
  },
] as unknown as ResumeModel[];

type Props = {
  resumes: ResumeModel[];
  searchTerms: string;
};
const Test: VoidFunctionComponent<Props> = ({ resumes, searchTerms }) => {
  const { archivedResumes, unarchivedResumes } = useSearch(resumes, searchTerms);

  return (
    <div>
      <ul data-testid="archived">
        {" "}
        {archivedResumes.map((res) => {
          return <li key={res.item.id}>{res.item.id}</li>;
        })}{" "}
      </ul>
      <ul data-testid="unarchived">
        {" "}
        {unarchivedResumes.map((res) => {
          return <li key={res.item.id}>{res.item.id}</li>;
        })}{" "}
      </ul>
    </div>
  );
};

describe("useSearch", () => {
  it("should return and filter the correct data", async () => {
    render(<Test resumes={data} searchTerms="" />);
    const archived = await screen.findByTestId("archived");
    const unarchived = await screen.findByTestId("unarchived");

    expect(archived.querySelectorAll("li").length).toEqual(2);
    expect(unarchived.querySelectorAll("li").length).toEqual(1);
  });

  it("should return and filter the correct data, with a searchterm", async () => {
    render(<Test resumes={data} searchTerms="react" />);
    const archived = await screen.findByTestId("archived");
    const unarchived = await screen.findByTestId("unarchived");

    expect(archived.querySelectorAll("li").length).toEqual(1);
    expect(unarchived.querySelectorAll("li").length).toEqual(1);
  });
});
