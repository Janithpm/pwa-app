# Jira Import Quick Reference Guide

This guide helps you import the EFFI Rental Dashboard project structure into Jira.

---

## 📋 Overview

**Total Items:**
- **16 Epics** - Major feature areas
- **60+ Stories** - User-facing features
- **200+ Tasks** - Implementation work items
- **600+ Sub-tasks** - Granular work breakdown

**Estimated Effort:** 320+ story points (16-20 sprints)

---

## 🚀 Import Methods

### Method 1: Manual Creation (Recommended for Small Teams)

#### Step 1: Create Epics
Create 16 epics in Jira with these names:

1. PWA Foundation & Core Infrastructure
2. Navigation & Layout System
3. Dashboard & Analytics Module
4. Product & Inventory Management
5. Order Management System
6. Customer Management
7. Shipment & Logistics
8. Promotions & Marketing
9. Finance & Accounting
10. Settings & Configuration
11. Help & Support System
12. Testing & Quality Assurance
13. Performance & Optimization
14. Security & Authentication
15. Accessibility & Internationalization
16. Technical Debt & Refactoring

#### Step 2: Create Stories
Under each epic, create stories as outlined in JIRA_PROJECT_STRUCTURE.md

#### Step 3: Create Tasks and Sub-tasks
For each story, create tasks and their associated sub-tasks

---

### Method 2: CSV Import (Recommended for Large Teams)

#### Step 1: Prepare CSV File
Create a CSV file with the following columns:

```csv
Issue Type,Summary,Description,Epic Link,Parent,Story Points,Priority,Labels
Epic,PWA Foundation & Core Infrastructure,Establish foundational PWA capabilities,,,13,P0,foundation
Story,PWA Configuration & Manifest Setup,Configure PWA with manifest and service worker,PWA Foundation & Core Infrastructure,,5,P0,pwa
Task,Web Manifest Configuration,Create and configure web.manifest,PWA Configuration & Manifest Setup,PWA Configuration & Manifest Setup,,P0,pwa config
Sub-task,Create app metadata,Create manifest with name description icons,Web Manifest Configuration,Web Manifest Configuration,,P0,
```

#### Step 2: Import to Jira
1. Go to Jira → Project Settings → Import
2. Select "CSV" as import source
3. Map columns to Jira fields
4. Import and verify

---

### Method 3: Jira API (Recommended for Automation)

Use Jira REST API to programmatically create issues:

```javascript
// Example: Create Epic
POST /rest/api/3/issue
{
  "fields": {
    "project": { "key": "EFFI" },
    "summary": "PWA Foundation & Core Infrastructure",
    "description": "Establish foundational PWA capabilities",
    "issuetype": { "name": "Epic" },
    "customfield_xxxxx": "EFFI-1" // Epic Name field
  }
}
```

---

## 🏷️ Labels & Tags

### Suggested Labels
- `foundation` - Core infrastructure work
- `pwa` - PWA-specific features
- `ui` - User interface components
- `backend` - Backend integration
- `analytics` - Analytics and reporting
- `finance` - Financial features
- `security` - Security-related work
- `performance` - Performance optimization
- `testing` - QA and testing
- `documentation` - Documentation work

### Component Tags
- Frontend
- Backend
- Database
- API
- DevOps
- Design
- QA

---

## 📊 Priority Mapping

### Priority Levels
```
P0 (Critical) - Must have for MVP
├── Epic 1: PWA Foundation
├── Epic 2: Navigation & Layout
├── Epic 3: Dashboard & Analytics
├── Epic 4: Product & Inventory
├── Epic 5: Order Management
└── Epic 6: Customer Management

P1 (High) - Should have for launch
├── Epic 7: Shipment & Logistics
├── Epic 8: Promotions & Marketing
├── Epic 9: Finance & Accounting
├── Epic 10: Settings & Configuration
└── Epic 14: Security & Authentication

P2 (Medium) - Nice to have
├── Epic 11: Help & Support
├── Epic 12: Testing & QA
├── Epic 13: Performance
└── Epic 15: Accessibility & i18n

P3 (Low) - Future enhancement
└── Epic 16: Technical Debt
```

---

## 🗓️ Sprint Planning

### Phase 1: Foundation (Sprints 1-4)
**Focus:** Setup and core infrastructure

**Epics to include:**
- Epic 1: PWA Foundation ✓
- Epic 2: Navigation & Layout ✓
- Epic 3: Dashboard (Part 1) ✓

**Deliverables:**
- Working PWA with offline support
- Complete navigation system
- Basic dashboard view

---

### Phase 2: Core Features (Sprints 5-10)
**Focus:** Main rental management features

**Epics to include:**
- Epic 3: Dashboard (Part 2) ✓
- Epic 4: Product & Inventory ✓
- Epic 5: Order Management ✓
- Epic 6: Customer Management ✓
- Epic 7: Shipments ✓

**Deliverables:**
- Complete product catalog
- Order processing system
- Customer management
- Basic shipment tracking

---

### Phase 3: Advanced Features (Sprints 11-14)
**Focus:** Marketing and finance capabilities

**Epics to include:**
- Epic 8: Promotions & Marketing ✓
- Epic 9: Finance & Accounting ✓
- Epic 10: Settings & Configuration ✓
- Epic 14: Security & Auth ✓

**Deliverables:**
- Marketing campaigns
- Financial tracking
- Complete settings
- Secure authentication

---

### Phase 4: Polish & Launch (Sprints 15-16)
**Focus:** Testing, optimization, and launch prep

**Epics to include:**
- Epic 12: Testing & QA ✓
- Epic 13: Performance ✓
- Bug fixes and polish ✓

**Deliverables:**
- Comprehensive test coverage
- Optimized performance
- Production-ready application

---

### Phase 5: Post-Launch (Ongoing)
**Focus:** Continuous improvement

**Epics to include:**
- Epic 11: Help & Support
- Epic 15: Accessibility & i18n
- Epic 16: Technical Debt

**Deliverables:**
- Help center
- Multi-language support
- Code quality improvements

---

## 📈 Story Point Reference

### Story Point Guidelines
- **1 point:** < 2 hours (simple config, small fix)
- **2 points:** 2-4 hours (simple component, basic form)
- **3 points:** 4-8 hours (medium component, form with validation)
- **5 points:** 1-2 days (complex component, API integration)
- **8 points:** 2-3 days (feature module, multiple components)
- **13 points:** 3-5 days (major feature, complex system)
- **21 points:** 1-2 weeks (epic-level work, needs breakdown)

### Task Size Recommendations
- Tasks should typically be 2-5 points
- Stories should be 5-13 points
- Anything larger should be split

---

## 🎯 Acceptance Criteria Template

### For Stories
```
Given [context]
When [action]
Then [expected result]

Example:
Given I am on the product listing page
When I click "Add Product"
Then I should see the product creation form
```

### For Tasks
```
- [ ] Code implementation complete
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No security vulnerabilities
```

---

## 👥 Team Assignment

### Role-Based Assignment

**Frontend Team:**
- Epic 1: PWA Foundation
- Epic 2: Navigation & Layout
- Epic 3: Dashboard & Analytics
- Epic 13: Performance Optimization

**Full-Stack Team:**
- Epic 4: Product Management
- Epic 5: Order Management
- Epic 6: Customer Management
- Epic 7: Shipments

**Backend Team:**
- Epic 9: Finance & Accounting
- Epic 14: Security & Authentication
- API development tasks

**Marketing/Growth Team:**
- Epic 8: Promotions & Marketing
- Epic 11: Help & Support

**QA Team:**
- Epic 12: Testing & QA
- Cross-epic testing tasks

**DevOps:**
- Deployment tasks
- CI/CD setup
- Infrastructure

---

## 🔄 Workflow States

### Recommended Workflow
1. **Backlog** - Not yet prioritized
2. **To Do** - Prioritized, ready for work
3. **In Progress** - Currently being worked on
4. **Code Review** - Awaiting review
5. **Testing** - In QA testing
6. **Done** - Complete and deployed

### Sprint Board Columns
- **Backlog** - Future work
- **Ready** - Sprint committed
- **In Dev** - Active development
- **Review** - Code review
- **QA** - Testing
- **Done** - Completed

---

## 📝 Custom Fields

### Recommended Custom Fields
- **Epic Link** - Link stories to epics
- **Story Points** - Effort estimation
- **Sprint** - Sprint assignment
- **Component** - Technical area
- **Tech Stack** - Technologies used
- **API Endpoint** - Related API
- **Design Link** - Figma/design link
- **Deployed** - Deployment status

---

## 🔗 Issue Linking

### Link Types to Use
- **Blocks/Is Blocked By** - Dependencies
- **Relates To** - Related work
- **Duplicates/Is Duplicated By** - Duplicate issues
- **Epic Link** - Story to Epic relationship
- **Parent/Sub-task** - Hierarchical relationship

---

## 📊 Reporting & Dashboards

### Suggested Dashboards

**1. Sprint Dashboard**
- Sprint burndown chart
- Sprint velocity
- Completed vs remaining work
- Blocked issues

**2. Epic Progress Dashboard**
- Epic completion percentage
- Stories done vs total
- Story points completed
- Timeline progress

**3. Team Dashboard**
- Work assigned per person
- Workload distribution
- Individual velocity
- Recent activity

**4. Quality Dashboard**
- Bug count by priority
- Technical debt items
- Test coverage
- Code review stats

---

## ✅ Quick Start Checklist

- [ ] Create project in Jira
- [ ] Set up custom fields (Epic Link, Story Points)
- [ ] Configure workflow states
- [ ] Create 16 epics from list
- [ ] Add stories to each epic
- [ ] Break down stories into tasks
- [ ] Add sub-tasks for granular tracking
- [ ] Assign story points
- [ ] Set priorities (P0-P3)
- [ ] Add labels and components
- [ ] Create sprint schedule
- [ ] Assign team members
- [ ] Set up dashboards
- [ ] Begin Sprint 1!

---

## 💡 Tips & Best Practices

### During Import
1. Start with epics, then stories, then tasks
2. Verify relationships after each import batch
3. Double-check story points and priorities
4. Ensure all descriptions are clear

### After Import
1. Review with the team
2. Adjust priorities based on business needs
3. Break down large stories if needed
4. Add acceptance criteria
5. Link related issues

### Ongoing Maintenance
1. Keep issues up to date
2. Log time spent
3. Update story points if estimates were off
4. Move completed work to Done
5. Groom backlog regularly

---

## 🆘 Troubleshooting

### Common Issues

**Issue:** CSV import fails
- **Solution:** Check CSV format, ensure required fields are present

**Issue:** Epic links not working
- **Solution:** Verify Epic Name custom field is configured

**Issue:** Story points not summing
- **Solution:** Check that Story Points field is numeric type

**Issue:** Sub-tasks not showing under parent
- **Solution:** Verify Parent field is set correctly

---

## 📚 Additional Resources

- [Jira CSV Import Guide](https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-a-csv-file/)
- [Jira REST API Documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [Agile Best Practices](https://www.atlassian.com/agile)

---

**Created:** November 15, 2024  
**Project:** EFFI Rental Dashboard  
**Version:** 1.0
