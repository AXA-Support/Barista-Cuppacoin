// export const sampleData = [
//   {
//     id: 58,
//     name: "Spring Campaign",
//     startDate: "2025-03-01T00:00:00.000000Z",
//     endDate: "2025-05-31T00:00:00.000000Z",
//     status: "active",
//     incentiveType: "Sales",
//     target: 30000,
//     actual: 18500,
//     bonusPot: 1500,
//     proRataBonus: "YES",
//     bonusAchieved: false,
//     employee: {
//       id: 7,
//       first_name: "John",
//       last_name: "Doe",
//       email: "john@gmail.com",
//       department: "Sales",
//       performanceRank: "Top 20%"
//     },
//     bands: [
//       {
//         id: 1,
//         name: "Band 1",
//         startRange: 0,
//         endRange: 10000,
//         bonusAmount: "300.00",
//         bonusType: "fixed",
//         employeesInBand: 15,
//         distributionPot: "4500.00",
//         requirements: "Achieve $0 - $10,000 in sales",
//         color: "#CD7F32",
//         isCurrentBand: false
//       },
//       {
//         id: 2,
//         name: "Band 2",
//         startRange: 10001,
//         endRange: 20000,
//         bonusAmount: "550.00",
//         bonusType: "pro_rata",
//         employeesInBand: 8,
//         distributionPot: "4400.00",
//         requirements: "Achieve $10,001 - $20,000 in sales",
//         color: "#C0C0C0",
//         isCurrentBand: true
//       },
//       {
//         id: 3,
//         name: "Band 3",
//         startRange: 20001,
//         endRange: 30000,
//         bonusAmount: "800.00",
//         bonusType: "pro_rata",
//         employeesInBand: 5,
//         distributionPot: "4000.00",
//         requirements: "Achieve $20,001 - $30,000 in sales",
//         color: "#FFD700",
//         isCurrentBand: false
//       }
//     ],
//     calculations: {
//       earnedBonus: 850,
//       totalDistributionPot: "15300.00",
//       averageBonus: "725.00",
//       nextBandProgress: 85
//     }
//   },

//   {
//     id: 59,
//     name: "Summer Promotion",
//     startDate: "2025-06-01T00:00:00.000000Z",
//     endDate: "2025-08-31T00:00:00.000000Z",
//     status: "active",
//     incentiveType: "Marketing",
//     target: 50000,
//     actual: 42000,
//     bonusPot: 2500,
//     proRataBonus: "YES",
//     bonusAchieved: true,
//     employee: {
//       id: 8,
//       first_name: "Sarah",
//       last_name: "Smith",
//       email: "sarah@gmail.com",
//       department: "Marketing",
//       performanceRank: "Top 10%"
//     },
//     bands: [
//       {
//         id: 1,
//         name: "Band 1",
//         startRange: 0,
//         endRange: 45000,
//         bonusAmount: "500.00",
//         bonusType: "fixed",
//         employeesInBand: 12,
//         distributionPot: "6000.00",
//         requirements: "Achieve $0 - $20,000 in sales",
//         color: "#CD7F32",
//         isCurrentBand: false
//       },
//       {
//         id: 2,
//         name: "Band 2",
//         startRange: 45001,
//         endRange: 50000,
//         bonusAmount: "1000.00",
//         bonusType: "pro_rata",
//         employeesInBand: 6,
//         distributionPot: "6000.00",
//         requirements: "Achieve $20,001 - $40,000 in sales",
//         color: "#C0C0C0",
//         isCurrentBand: false
//       }
//     ],
//     calculations: {
//       earnedBonus: 2500,
//       totalDistributionPot: "19500.00",
//       averageBonus: "833.33",
//       nextBandProgress: 100
//     }
//   },

//   {
//     id: 60,
//     name: "Q4 Blitz",
//     startDate: "2025-10-01T00:00:00.000000Z",
//     endDate: "2025-12-31T00:00:00.000000Z",
//     status: "upcoming",
//     incentiveType: "Sales",
//     target: 75000,
//     actual: 0,
//     bonusPot: 5000,
//     proRataBonus: "NO",
//     bonusAchieved: false,
//     employee: {
//       id: 9,
//       first_name: "Mike",
//       last_name: "Johnson",
//       email: "mike@gmail.com",
//       department: "Sales",
//       performanceRank: "Top 30%"
//     },
//     bands: [
//       {
//         id: 1,
//         name: "Band 1",
//         startRange: 0,
//         endRange: 25000,
//         bonusAmount: "1000.00",
//         bonusType: "fixed",
//         employeesInBand: 20,
//         distributionPot: "20000.00",
//         requirements: "Achieve $0 - $25,000 in sales",
//         color: "#CD7F32",
//         isCurrentBand: false
//       },
//       {
//         id: 2,
//         name: "Band 2",
//         startRange: 25001,
//         endRange: 50000,
//         bonusAmount: "2000.00",
//         bonusType: "fixed",
//         employeesInBand: 10,
//         distributionPot: "20000.00",
//         requirements: "Achieve $25,001 - $50,000 in sales",
//         color: "#C0C0C0",
//         isCurrentBand: false
//       },
//       {
//         id: 3,
//         name: "Band 3",
//         startRange: 50001,
//         endRange: 75000,
//         bonusAmount: "5000.00",
//         bonusType: "fixed",
//         employeesInBand: 5,
//         distributionPot: "25000.00",
//         requirements: "Achieve $50,001 - $75,000 in sales",
//         color: "#FFD700",
//         isCurrentBand: false
//       }
//     ],
//     calculations: {
//       earnedBonus: 0,
//       totalDistributionPot: "65000.00",
//       averageBonus: "1666.67",
//       nextBandProgress: 0
//     }
//   }
// ];




////////////////////////////////////////////////


export const sampleData = [
  {
    id: 58,
    name: "Spring Campaign From Bands",
    startDate: "2025-03-01T00:00:00.000000Z",
    endDate: "2025-05-31T00:00:00.000000Z",
    status: "Running",
    incentiveType: "Sales",
    target: 30000,
    actual: 18500,
    bonusPot: 1500,
    proRataBonus: "YES",
    bonusAchieved: false,
    employee: {
      id: 7,
      first_name: "John",
      last_name: "Doe",
      email: "john@gmail.com",
      department: "Sales",
      performanceRank: "Top 20%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 0,
        endRange: 10000,
        bonusAmount: "300.00",
        bonusType: "fixed",
        employeesInBand: 15,
        distributionPot: "4500.00",
        requirements: "Achieve $0 - $10,000 in sales",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 10001,
        endRange: 20000,
        bonusAmount: "550.00",
        bonusType: "pro_rata",
        employeesInBand: 8,
        distributionPot: "4400.00",
        requirements: "Achieve $10,001 - $20,000 in sales",
        color: "#C0C0C0",
        isCurrentBand: true
      },
      {
        id: 3,
        name: "Band 3",
        startRange: 20001,
        endRange: 30000,
        bonusAmount: "800.00",
        bonusType: "pro_rata",
        employeesInBand: 5,
        distributionPot: "4000.00",
        requirements: "Achieve $20,001 - $30,000 in sales",
        color: "#FFD700",
        isCurrentBand: false
      }
    ],
    calculations: {
      earnedBonus: 850,
      totalDistributionPot: "15300.00",
      averageBonus: "725.00",
      nextBandProgress: 85
    }
  },

  {
    id: 59,
    name: "Summer Promotion",
    startDate: "2025-06-01T00:00:00.000000Z",
    endDate: "2025-08-31T00:00:00.000000Z",
    status: "Running",
    incentiveType: "Marketing",
    target: 50000,
    actual: 42000,
    bonusPot: 2500,
    proRataBonus: "YES",
    bonusAchieved: true,
    employee: {
      id: 8,
      first_name: "Sarah",
      last_name: "Smith",
      email: "sarah@gmail.com",
      department: "Marketing",
      performanceRank: "Top 10%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 0,
        endRange: 45000,
        bonusAmount: "500.00",
        bonusType: "fixed",
        employeesInBand: 12,
        distributionPot: "6000.00",
        requirements: "Achieve $0 - $20,000 in sales",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 45001,
        endRange: 50000,
        bonusAmount: "1000.00",
        bonusType: "pro_rata",
        employeesInBand: 6,
        distributionPot: "6000.00",
        requirements: "Achieve $20,001 - $40,000 in sales",
        color: "#C0C0C0",
        isCurrentBand: false
      }
    ],
    calculations: {
      earnedBonus: 2500,
      totalDistributionPot: "19500.00",
      averageBonus: "833.33",
      nextBandProgress: 100
    }
  },

  {
    id: 60,
    name: "Q4 Blitz",
    startDate: "2025-10-01T00:00:00.000000Z",
    endDate: "2025-12-31T00:00:00.000000Z",
    status: "Expired",
    incentiveType: "Sales",
    target: 75000,
    actual: 30,
    bonusPot: 5000,
    proRataBonus: "NO",
    bonusAchieved: false,
    employee: {
      id: 9,
      first_name: "Mike",
      last_name: "Johnson",
      email: "mike@gmail.com",
      department: "Sales",
      performanceRank: "Top 30%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 35,
        endRange: 25000,
        bonusAmount: "1000.00",
        bonusType: "fixed",
        employeesInBand: 20,
        distributionPot: "20000.00",
        requirements: "Achieve $0 - $25,000 in sales",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 25001,
        endRange: 50000,
        bonusAmount: "2000.00",
        bonusType: "fixed",
        employeesInBand: 10,
        distributionPot: "20000.00",
        requirements: "Achieve $25,001 - $50,000 in sales",
        color: "#C0C0C0",
        isCurrentBand: false
      },
      {
        id: 3,
        name: "Band 3",
        startRange: 50001,
        endRange: 75000,
        bonusAmount: "5000.00",
        bonusType: "fixed",
        employeesInBand: 5,
        distributionPot: "25000.00",
        requirements: "Achieve $50,001 - $75,000 in sales",
        color: "#FFD700",
        isCurrentBand: false
      }
    ],
    calculations: {
      earnedBonus: 0,
      totalDistributionPot: "65000.00",
      averageBonus: "1666.67",
      nextBandProgress: 0
    }
  },

  {
    id: 61,
    name: "Tech Innovation Drive",
    startDate: "2025-01-15T00:00:00.000000Z",
    endDate: "2025-04-15T00:00:00.000000Z",
    status: "Completed",
    incentiveType: "Technology",
    target: 100000,
    actual: 125000,
    bonusPot: 10000,
    proRataBonus: "YES",
    bonusAchieved: true,
    employee: {
      id: 10,
      first_name: "Alex",
      last_name: "Chen",
      email: "alex.chen@company.com",
      department: "Engineering",
      performanceRank: "Top 5%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 0,
        endRange: 50000,
        bonusAmount: "1500.00",
        bonusType: "fixed",
        employeesInBand: 8,
        distributionPot: "12000.00",
        requirements: "Complete $0 - $50,000 in project value",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 50001,
        endRange: 100000,
        bonusAmount: "3000.00",
        bonusType: "pro_rata",
        employeesInBand: 5,
        distributionPot: "15000.00",
        requirements: "Complete $50,001 - $100,000 in project value",
        color: "#C0C0C0",
        isCurrentBand: false
      },
      {
        id: 3,
        name: "Band 3",
        startRange: 100001,
        endRange: 150000,
        bonusAmount: "5000.00",
        bonusType: "pro_rata",
        employeesInBand: 3,
        distributionPot: "15000.00",
        requirements: "Complete $100,001 - $150,000 in project value",
        color: "#FFD700",
        isCurrentBand: true
      }
    ],
    calculations: {
      earnedBonus: 5833.33,
      totalDistributionPot: "45000.00",
      averageBonus: "2750.00",
      nextBandProgress: 67
    }
  },

  {
    id: 62,
    name: "Customer Retention Push",
    startDate: "2025-02-01T00:00:00.000000Z",
    endDate: "2025-03-31T00:00:00.000000Z",
    status: "Running",
    incentiveType: "Customer Success",
    target: 85,
    actual: 72,
    bonusPot: 3500,
    proRataBonus: "YES",
    bonusAchieved: false,
    employee: {
      id: 11,
      first_name: "Maria",
      last_name: "Rodriguez",
      email: "maria.rodriguez@company.com",
      department: "Customer Success",
      performanceRank: "Top 15%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 0,
        endRange: 50,
        bonusAmount: "400.00",
        bonusType: "fixed",
        employeesInBand: 25,
        distributionPot: "10000.00",
        requirements: "Retain 0-50 customers",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 51,
        endRange: 75,
        bonusAmount: "700.00",
        bonusType: "pro_rata",
        employeesInBand: 18,
        distributionPot: "12600.00",
        requirements: "Retain 51-75 customers",
        color: "#C0C0C0",
        isCurrentBand: true
      },
      {
        id: 3,
        name: "Band 3",
        startRange: 76,
        endRange: 85,
        bonusAmount: "1000.00",
        bonusType: "pro_rata",
        employeesInBand: 10,
        distributionPot: "10000.00",
        requirements: "Retain 76-85 customers",
        color: "#FFD700",
        isCurrentBand: false
      }
    ],
    calculations: {
      earnedBonus: 658.33,
      totalDistributionPot: "32600.00",
      averageBonus: "615.38",
      nextBandProgress: 60
    }
  },

  {
    id: 63,
    name: "Product Launch Sprint",
    startDate: "2025-04-01T00:00:00.000000Z",
    endDate: "2025-05-15T00:00:00.000000Z",
    status: "Upcoming",
    incentiveType: "Product",
    target: 95,
    actual: 0,
    bonusPot: 8000,
    proRataBonus: "NO",
    bonusAchieved: false,
    employee: {
      id: 12,
      first_name: "David",
      last_name: "Wilson",
      email: "david.wilson@company.com",
      department: "Product",
      performanceRank: "Top 25%"
    },
    bands: [
      {
        id: 1,
        name: "Band 1",
        startRange: 0,
        endRange: 40,
        bonusAmount: "1200.00",
        bonusType: "fixed",
        employeesInBand: 15,
        distributionPot: "18000.00",
        requirements: "Complete 0-40 launch milestones",
        color: "#CD7F32",
        isCurrentBand: false
      },
      {
        id: 2,
        name: "Band 2",
        startRange: 41,
        endRange: 70,
        bonusAmount: "2500.00",
        bonusType: "fixed",
        employeesInBand: 8,
        distributionPot: "20000.00",
        requirements: "Complete 41-70 launch milestones",
        color: "#C0C0C0",
        isCurrentBand: false
      },
      {
        id: 3,
        name: "Band 3",
        startRange: 71,
        endRange: 95,
        bonusAmount: "5000.00",
        bonusType: "fixed",
        employeesInBand: 5,
        distributionPot: "25000.00",
        requirements: "Complete 71-95 launch milestones",
        color: "#FFD700",
        isCurrentBand: false
      }
    ],
    calculations: {
      earnedBonus: 0,
      totalDistributionPot: "63000.00",
      averageBonus: "2100.00",
      nextBandProgress: 0
    }
  }
];