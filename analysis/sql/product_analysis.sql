-- ==========================================
-- Product Category & Sales Contribution Queries
-- Target Table: orders (orderId, customerId, amount, category, city, date)
-- ==========================================

-- 1. Product Category Revenue Contribution
SELECT 
    category,
    COUNT(orderId) AS total_orders,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_amount_per_order,
    MAX(amount) AS peak_order_amount
FROM 
    orders
GROUP BY 
    category
ORDER BY 
    total_revenue DESC;

-- 2. Month-over-Month Category Popularity Trends
SELECT 
    DATE_FORMAT(`date`, '%Y-%m') AS sales_month,
    category,
    COUNT(orderId) AS monthly_orders,
    SUM(amount) AS monthly_category_revenue
FROM 
    orders
GROUP BY 
    DATE_FORMAT(`date`, '%Y-%m'), 
    category
ORDER BY 
    sales_month ASC, 
    monthly_category_revenue DESC;

-- 3. City-to-Category Preference Matrix
SELECT 
    city,
    category,
    COUNT(orderId) AS category_order_count,
    SUM(amount) AS category_revenue_by_city
FROM 
    orders
GROUP BY 
    city, 
    category
ORDER BY 
    city ASC, 
    category_revenue_by_city DESC;
