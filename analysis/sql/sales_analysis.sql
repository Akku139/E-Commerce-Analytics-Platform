-- ==========================================
-- E-Commerce Sales Performance Queries
-- Target Table: orders (orderId, customerId, amount, category, city, date)
-- ==========================================

-- 1. Daily Sales Performance & Order Volume
SELECT 
    `date` AS order_date,
    COUNT(orderId) AS total_orders,
    SUM(amount) AS daily_revenue,
    AVG(amount) AS average_order_value
FROM 
    orders
GROUP BY 
    `date`
ORDER BY 
    `date` DESC;

-- 2. Monthly Revenue Trend and Growth Rate
WITH MonthlyRevenue AS (
    SELECT 
        DATE_FORMAT(`date`, '%Y-%m') AS sales_month,
        SUM(amount) AS monthly_revenue,
        COUNT(orderId) AS total_orders
    FROM 
        orders
    GROUP BY 
        DATE_FORMAT(`date`, '%Y-%m')
)
SELECT 
    sales_month,
    monthly_revenue,
    total_orders,
    LAG(monthly_revenue) OVER (ORDER BY sales_month) AS prev_month_revenue,
    ROUND(
        ((monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY sales_month)) / 
        LAG(monthly_revenue) OVER (ORDER BY sales_month)) * 100, 
        2
    ) AS monthly_growth_percentage
FROM 
    MonthlyRevenue;

-- 3. Top Cities by Revenue Contribution and Customer Penetration
SELECT 
    city,
    COUNT(DISTINCT customerId) AS unique_customers,
    COUNT(orderId) AS total_orders,
    SUM(amount) AS total_sales,
    ROUND((SUM(amount) / (SELECT SUM(amount) FROM orders)) * 100, 2) AS sales_contribution_percentage
FROM 
    orders
GROUP BY 
    city
ORDER BY 
    total_sales DESC;
