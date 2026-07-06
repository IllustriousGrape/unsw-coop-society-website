import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { placeholderEvents } from "@/lib/placeholder-data";

describe("Button", () => {
  it("renders and handles clicks", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(clicked).toBe(true);
  });

  it("defaults to type=button to avoid accidental form submits", () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

describe("ButtonLink", () => {
  it("renders an internal link", () => {
    render(<ButtonLink href="/events">Events</ButtonLink>);
    expect(screen.getByRole("link", { name: "Events" })).toHaveAttribute(
      "href",
      "/events"
    );
  });

  it("adds security attributes to external links", () => {
    render(
      <ButtonLink href="https://example.com" external>
        External
      </ButtonLink>
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>networking</Badge>);
    expect(screen.getByText("networking")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders title, eyebrow, and description", () => {
    render(
      <SectionHeading
        eyebrow="What's on"
        title="Upcoming Events"
        description="Fun for everyone."
      />
    );
    expect(
      screen.getByRole("heading", { name: "Upcoming Events" })
    ).toBeInTheDocument();
    expect(screen.getByText("What's on")).toBeInTheDocument();
    expect(screen.getByText("Fun for everyone.")).toBeInTheDocument();
  });
});

describe("EventsExplorer", () => {
  it("shows all events initially", () => {
    render(<EventsExplorer events={placeholderEvents} />);
    expect(
      screen.getByText("Industry Networking Night 2026")
    ).toBeInTheDocument();
    expect(screen.getByText("Charity Trivia Night")).toBeInTheDocument();
  });

  it("filters by category", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={placeholderEvents} />);
    await user.click(screen.getByRole("button", { name: "Charity" }));
    expect(screen.getByText("Charity Trivia Night")).toBeInTheDocument();
    expect(
      screen.queryByText("Industry Networking Night 2026")
    ).not.toBeInTheDocument();
  });

  it("filters by search query", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={placeholderEvents} />);
    await user.type(screen.getByLabelText("Search events"), "cruise");
    expect(screen.getByText("End of Term Harbour Cruise")).toBeInTheDocument();
    expect(screen.queryByText("Charity Trivia Night")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={placeholderEvents} />);
    await user.type(screen.getByLabelText("Search events"), "zzzzzz");
    expect(
      screen.getByText(/No events match your search/i)
    ).toBeInTheDocument();
  });
});
