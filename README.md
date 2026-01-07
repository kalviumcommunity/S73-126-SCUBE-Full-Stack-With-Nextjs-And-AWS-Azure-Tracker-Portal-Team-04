# S73-126-SCUBE-Full-Stack-With-Nextjs-And-AWS-Azure-Tracker-Portal-Team-04

## Rendering Strategies Used

### Static Rendering (SSG)
Page: /about
Generated at build time
Improves speed and reduces server cost

### Dynamic Rendering (SSR)
Page: /dashboard
Data fetched on every request
Ensures real-time accuracy

### Hybrid Rendering (ISR)
Page: /internships
Revalidates every 60 seconds
Balances freshness and performance

## Reflection
If the application scaled to 10x users, using SSR everywhere
would increase server load and cost. Static rendering and ISR
would be preferred for scalability and better performance.
