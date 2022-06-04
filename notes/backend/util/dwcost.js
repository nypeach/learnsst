export function calculateDwCost(dwDetails) {
  const cloudApps = dwDetails.cloudApps;
  const onPremApps = dwDetails.onPremApps;
  const recordsPerMonth = dwDetails.recordsPerMonth;
  const hoursPerMonth = dwDetails.hoursPerMonth;
  const hourlyRate = dwDetails.hourlyRate;
  const minutesPerRecord = hoursPerMonth * recordsPerMonth;
  const customerCost = hourlyRate * hoursPerMonth * 1.3;
  const dwType = onPremApps === 0 ? "Cloud Only" : cloudApps === 0 ? "On-Prem Only" : "Hybrid";
  return customerCost;
}