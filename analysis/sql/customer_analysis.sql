-- ==========================================
-- Customer Retention & Lifetime Value Queries
-- Target Table: orders (orderId, customerId, amount, category, city, date)
-- ==========================================

-- 1. Customer Purchase Frequency & Total Spend (CLV Proxy)
SELECT 
    customerId,
    COUNT(orderId) AS total_purchases,
    SUM(amount) AS lifetime_value,
    AVG(amount) AS average_purchase_value,
    MIN(`date`) AS first_purchase_date,
    MAX(`date`) AS last_purchase_date
FROM 
    orders
GROUP BY 
    customerId
ORDER BY 
    lifetime_value DESC;

-- 2. Customer Cohort & Repeat Purchase Rate (RPR)
-- Calculates what percentage of customers have made more than 1 purchase.
WITH CustomerPurchaseCounts AS (
    SELECT 
        customerId,
        COUNT(orderId) AS purchase_count
    FROM 
        orders
    GROUP BY 
        customerId
)
SELECT 
    COUNT(CASE WHEN purchase_count > 1 THEN 1 END) AS repeat_customers_count,
    COUNT(customerId) AS total_customers_count,
    ROUND(
        (COUNT(CASE WHEN purchase_count > 1 THEN 1 END) / COUNT(customerId)) * 100, 
        2
    ) AS repeat_purchase_rate_percentage
FROM 
    CustomerPurchaseCounts;

-- 3. High-Value Customer (VIP) Segmentation (Spending > $1000)
SELECT 
    customerId,
    COUNT(orderId) AS purchase_count,
    SUM(amount) AS total_spend,
    CASE 
        WHEN SUM(amount) >= 1500 THEN 'Platinum VIP'
        WHEN SUM(amount) BETWEEN 1000 AND 1499 THEN 'Gold Partner'
        ELSE 'Regular Customer'
    END AS customer_tier
FROM 
    orders
GROUP BY 
    customerId
ORDER BY 
    total_spend DESC;
