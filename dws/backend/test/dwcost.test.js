import { expect, test } from "vitest";
import { calculateDwCost } from "../util/dwcost";

test("3-Cloud, 0-OnPrem, 3000-Records, 20-Hours, 16-PerHour", () => {
  const dwDetail = {
    cloudApps: 3,
    onPremApps: 0,
    recordsPerMonth: 3000,
    hoursPerMonth: 20,
    hourlyRate: 16
  }
  const cost = 416;
  const expectedCost = calculateDwCost(dwDetail);

  expect(cost).toEqual(expectedCost);
});

test("3-Cloud, 2-OnPrem, 30000-Records, 160-Hours, 25-PerHour", () => {
  const dwDetail = {
    cloudApps: 3,
    onPremApps: 2,
    recordsPerMonth: 30000,
    hoursPerMonth: 160,
    hourlyRate: 25
  }
  const cost = 5200;
  const expectedCost = calculateDwCost(dwDetail);

  expect(cost).toEqual(expectedCost);
});

test("0-Cloud, 2-OnPrem, 5000-Records, 160-Hours, 30-PerHour", () => {
  const dwDetail = {
    cloudApps: 0,
    onPremApps: 2,
    recordsPerMonth: 5000,
    hoursPerMonth: 160,
    hourlyRate: 30
  }
  const cost = 6240;
  const expectedCost = calculateDwCost(dwDetail);

  expect(cost).toEqual(expectedCost);
});