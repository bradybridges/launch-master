import React from "react";
import { Switch, Typography } from "@material-ui/core";
import { ReactComponent as SunImg } from "../../Images/sun.svg";
import { shallow } from "enzyme";
import Header from "./Header";

describe("Header", () => {
  const mockToggleDarkMode = jest.fn();
  const wrapper = shallow(
    <Header toggleDarkMode={mockToggleDarkMode} darkMode={true} />
  );
  it("Header should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("There should be a dark mode icon present", () => {
    expect(wrapper.find(SunImg)).toHaveLength(1);
  });

  it("When the switch is clicked toggleDarkMode should be called", () => {
    const toggle = wrapper.find(SunImg);
    toggle.props().onClick();
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it("There should be an h1 header with a value of Launch Master", () => {
    const header = wrapper.find(Typography).first().props();
    expect(header.variant).toEqual("h1");
    expect(header.children).toEqual("Launch Master");
  });
});
