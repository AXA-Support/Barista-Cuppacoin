// combinedIncentiveData.js
export const combinedIncentiveData = {
  sales: {
    regular: [
      {
        id: 1,
        name: "QA Sales Target",
        incentiveType: "Sales",
        target: 10000,
        actual: 9500,
        // effective amount
        bonusPot: 500,
        startDate: "2024-10-01",
        endDate: "2026-01-31", // 1+ month left
        status: "active",
        createdDate: "2024-10-01",
        // status
        d: false,
        proRataBonus: "YES",
        // actual should be greater then target
        bonusAchieved: false
      },
      {
        id: 2,
        name: "My Sales Target",
        incentiveType: "Sales",
        target: 10000,
        actual: 9500,
        bonusPot: 500,
        startDate: "2025-12-01",
        endDate: "2025-12-30", // ~2 weeks left
        status: "expired",
        createdDate: "2024-12-01",
        deleted: false,
        proRataBonus: "NO",
        bonusAchieved: false
      },
    ],
    bands: [
      {
        id: 58,
        name: "Spring Campaign From Bands",
        startDate: "2025-03-01T00:00:00.000000Z",
        endDate: "2025-05-31T00:00:00.000000Z",
        status: "active",
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
            // Band bonus on Achievement 
            bonusAmount: "300.00",
            bonusType: "fixed",
            employeesInBand: 15, // no need
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
        status: "active",
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
    ]
  },
  reviews: {
    regular: [
      {
        id: 1,
        name: "Customer Reviews",
        incentiveType: "Reviews",
        target: 5.0,
        actual: 4.5,
        bonusPot: 100,
        startDate: "2025-11-12",
        endDate: "2025-12-31", // Expired
        status: "expired",
        createdDate: "2024-10-01",
        deleted: false,
        proRataBonus: "YES",
        bonusAchieved: false
      },
      {
        id: 2,
        name: "5-Star Reviews",
        incentiveType: "Reviews",
        target: 3.0,
        actual: 3.5,
        bonusPot: 150,
        startDate: "2024-12-01",
        endDate: "2025-01-31", // ~1 month left
        status: "active",
        createdDate: "2024-11-20",
        deleted: false,
        proRataBonus: "NO",
        bonusAchieved: true
      }
    ],
    bands: [] // No band data for reviews
  },
  upsell: {
    regular: [],
    bands: [] // No band data for upsell
  },
  audits: {
    regular: [],
    bands: [] // No band data for audits
  }
};