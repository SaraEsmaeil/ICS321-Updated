
### Font name: 
font-family: 'Segoe UI', sans-serif;

colors number:
Color | Usage
⚽️ Navy Blue (#002B5B) | Primary (navbar, buttons)
⚽️ Sky Blue (#00B4D8) | Accent (hover effects, links)
⚽️ White (#FFFFFF) | Background
⚽️ Light Gray (#F4F4F4) | Cards, forms
⚽️ Dark Red (#D00000) | Warnings, red cards

### Logo:

![LogoHome](https://github.com/user-attachments/assets/643f3b95-0bc3-4e9e-97b6-1471396e9d8a)


Database: MySQL

Backend: Node.js + Express.js

FrontEnd: React + Bootstrap

Platform: vcs


### code structure 

## 📂 Codebase Structure

```plaintext
src/
│
├── assets/                     # Static assets like logos and backgrounds
│   ├── logo.png
│   ├── stadium-bg.png
│
├── components/                 # Reusable UI components
│   ├── AdminSidebarNav.js
│   ├── GuestSidebarNav.js
│   ├── SidebarNav.css
│   ├── AdminStatsCards.js
│   ├── AdminStatsCards.css
│   ├── MatchSummary.js
│   ├── MatchSummary.css
│   ├── RecentTournaments.js
│   ├── RecentTournaments.css
│
├── pages/                      # Page components grouped by roles
│   ├── Home/
│   │   ├── Home.js             # Landing page
│   │   ├── Home.css
│   ├── Login/
│   │   ├── Login.js            # Admin/Guest login form
│   │   ├── Login.css
│   ├── Tournament_Admin/       # Admin-only views
│   │   ├── AdminDashboard.js
│   │   ├── AddTournament.js
│   │   ├── AddTournament.css
│   │   ├── ApprovePlayer.js
│   │   ├── AssignCaptain.js
│   │   ├── ScheduleMatch.js
│   │   ├── EnterMatchResults.js
│   │   ├── CardManagement.js
│   │   ├── BestPlayer.js
│   │   ├── Fields.js
│   │   ├── AddTeam.js
│   │   ├── AddPlayer.js
│   │   ├── DeleteTournament.js
│   ├── Guest/                  # Guest-only views
│   │   ├── GuestDashboard.js
│   │   ├── ViewMatchResults.js
│   │   ├── ViewTeams.js
│   │   ├── ViewPlayers.js
│
├── context/                    # React Context API providers
│   ├── AuthContext.js
│
├── styles/                     # Global styling files
│   ├── Typography.css
│
├── App.js                      # Root component
├── App.css
├── index.js                    # Entry point
├── routes.js                   # Central route definitions
```





