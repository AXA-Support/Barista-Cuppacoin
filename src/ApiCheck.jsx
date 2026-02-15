import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SquareSalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // ⚠️ REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
  const BEARER_TOKEN = 'EAAAl0fOK77VgQtHDiUHACpgbQjRfl7kL0FM6ZgqMzDzaV15OENtUyeZyrppNNJh'; // e.g., sq0atp-...
  const LOCATION_ID = 'L83NEBT1VK0F8';

  // Styles
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif'
    },
    credentialsNote: {
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '24px',
      fontSize: '14px',
      color: '#856404'
    },
    title: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px'
    },
    form: {
      background: '#f8f9fa',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      alignItems: 'flex-end'
    },
    formGroup: {
      flex: 1,
      minWidth: '200px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s'
    },
    button: {
      background: 'linear-gradient(135deg, #0070e0, #0052a8)',
      color: 'white',
      border: 'none',
      padding: '14px 28px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      minWidth: '180px'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #f5c6cb'
    },
    totalCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '40px',
      borderRadius: '16px',
      textAlign: 'center',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
    },
    salesAmount: {
      fontSize: '48px',
      fontWeight: '700',
      margin: '10px 0',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    tableContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '16px'
    },
    th: {
      textAlign: 'left',
      padding: '16px',
      borderBottom: '2px solid #eee',
      color: '#666',
      fontWeight: '600',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f0f0f0',
      color: '#333'
    },
    trHover: {
      backgroundColor: '#f9f9f9'
    }
  };

  useEffect(() => {
    // Set default dates (last 7 days)
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
    
    setStartDate(sevenDaysAgoStr);
    setEndDate(today);
  }, []);

  const fetchSalesData = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError('');
    setTotalSales(0);
    setOrders([]);

    try {
      const startDateTime = `${startDate}T00:00:00Z`;
      const endDateTime = `${endDate}T23:59:59Z`;

      const response = await axios.post(
        'https://connect.squareup.com/v2/orders/search',
        {
          location_ids: [LOCATION_ID],
          query: {
            filter: {
              date_time_filter: {
                created_at: {
                  start_at: startDateTime,
                  end_at: endDateTime
                }
              },
              state_filter: {
                states: ['COMPLETED']
              }
            }
          },
          limit: 100
        },
        {
          headers: {
            'Square-Version': '2024-01-18',
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const ordersData = response.data.orders || [];
      setOrders(ordersData);

      let totalCents = 0;
      ordersData.forEach(order => {
        if (order.total_money && order.total_money.amount) {
          totalCents += order.total_money.amount;
        }
      });

      const totalDollars = totalCents / 100;
      setTotalSales(totalDollars);

    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError(err.response?.data?.errors?.[0]?.detail || 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSalesData();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Square Sales Report</h1>
      
      <div style={styles.credentialsNote}>
        <p><strong>Note:</strong> Update BEARER_TOKEN and LOCATION_ID in the code</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="startDate" style={styles.label}>Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="endDate" style={styles.label}>End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            ...styles.button,
            background: loading ? '#ccc' : styles.button.background,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Fetching...' : 'Get Sales Data'}
        </button>
      </form>

      {error && (
        <div style={styles.error}>
          <p>Error: {error}</p>
        </div>
      )}

      {totalSales > 0 && (
        <div>
          <div style={styles.totalCard}>
            <h2>Total Sales</h2>
            <p style={styles.salesAmount}>{formatCurrency(totalSales)}</p>
            <p style={{ opacity: 0.9, margin: '10px 0' }}>
              {startDate} to {endDate}
            </p>
            <p style={{
              background: 'rgba(255,255,255,0.2)',
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              marginTop: '10px'
            }}>
              {orders.length} order(s) found
            </p>
          </div>

          {orders.length > 0 && (
            <div style={styles.tableContainer}>
              <h3>Recent Orders</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order, index) => (
                    <tr 
                      key={order.id} 
                      style={{ ':hover': { backgroundColor: '#f9f9f9' } }}
                    >
                      <td style={styles.td}>{order.id.substring(0, 8)}...</td>
                      <td style={styles.td}>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td style={styles.td}>{order.state}</td>
                      <td style={styles.td}>{formatCurrency(order.total_money?.amount / 100 || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length > 10 && (
                <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', marginTop: '16px' }}>
                  Showing 10 of {orders.length} orders
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SquareSalesReport;