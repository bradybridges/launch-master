import React from "react";
import { shallow } from "enzyme";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import LaunchOptionsBar from "./LaunchOptionsBar";

describe("LaunchOptionsBar", () => {
  const mockSetTimeFrame = jest.fn();
  const mockSetNumResults = jest.fn();
  const wrapper = shallow(
    <LaunchOptionsBar
      setTimeFrame={mockSetTimeFrame}
      setNumResults={mockSetNumResults}
      numResults={10}
    />
  );

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Toggle button group should have expected props", () => {
    const buttonGroup = wrapper.find(ToggleButtonGroup).first().props();
    expect(buttonGroup.value).toEqual("upcoming");
    expect(buttonGroup["aria-label"]).toEqual(
      "past or upcoming launch selection"
    );
  });

  it("Upcoming launches button should have expected properties and call setTimeFrame when clicked", () => {
    const upcomingButton = wrapper.find(ToggleButton).at(0).props();
    expect(upcomingButton.value).toEqual("upcoming");
    expect(upcomingButton["aria-label"]).toEqual("upcoming launches");
    expect(upcomingButton.children).toEqual("Upcoming");
    upcomingButton.onClick();
    expect(mockSetTimeFrame).toHaveBeenCalledWith(false);
  });

  it("Past launches button should have expected props and call setTimeFrame when clicked", () => {
    const pastButton = wrapper.find(ToggleButton).at(1).props();
    expect(pastButton.value).toEqual("past");
    expect(pastButton.children).toEqual("Past");
    expect(pastButton["aria-label"]).toEqual("past launches");
    pastButton.onClick();
    expect(mockSetTimeFrame).toHaveBeenCalledWith(true);
    const upcomingButton = wrapper.find(ToggleButton).at(0).props();
    upcomingButton.onClick();
  });

  it("FormControl should have expected properties", () => {
    const formControl = wrapper.find(FormControl).first().props();
    expect(formControl.variant).toEqual("filled");
  });

  it("InputLabel should have a value of Results", () => {
    const inputLabel = wrapper.find(InputLabel).first().props();
    expect(inputLabel.children).toEqual("Results");
  });

  it("Select element should have the correct properties", () => {
    const select = wrapper.find(Select).first().props();
    expect(select.id).toEqual("select-filled");
    expect(select.value).toEqual(10);
  });

  it("Select element should call handleNumResults when the user selects a new value", () => {
    const select = wrapper.find(Select).first().props();
    select.onChange({ target: { value: 25 } });
    expect(mockSetNumResults).toHaveBeenCalledWith(25);
  });

  it("There should be three menu items with values 10, 25, and 50", () => {
    const menuItems = wrapper.find(MenuItem);
    expect(menuItems.length).toEqual(3);
    const itemOne = menuItems.at(0).props();
    const itemTwo = menuItems.at(1).props();
    const itemThree = menuItems.at(2).props();
    expect(itemOne).toEqual({ value: 10, children: "10" });
    expect(itemTwo).toEqual({ value: 25, children: "25" });
    expect(itemThree).toEqual({ value: 50, children: "50" });
  });
});
