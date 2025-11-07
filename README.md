# CNC Auto Design - Admin Panel

## Overview
This is a comprehensive admin panel for managing CNC Auto Design software user registrations and payments. The admin panel allows administrators to review payment requests, approve/reject users, and manage system settings.

## Features

### 🎯 Dashboard
- **Statistics Overview**: View pending requests, approved users, total revenue, and total users
- **Recent Activity**: Monitor latest activities and approvals
- **Quick Actions**: Easy access to common tasks

### 👥 Payment Requests Management
- **View All Requests**: See all user payment requests with detailed information
- **Request Details**: Click on any request to view complete user information
- **Approve/Reject**: One-click approval or rejection of payment requests
- **Status Tracking**: Monitor request status (pending, approved, rejected)
- **Search & Filter**: Find specific requests by name, mobile, or status

### 👤 Active Users Management
- **User Overview**: View all approved and active users
- **User Details**: Access complete user information
- **User Actions**: Deactivate users if needed
- **Package Filtering**: Filter users by subscription package

### ⚙️ Settings Management
- **Payment Settings**: Configure Nagad, bKash, Master Card, and Debit Card numbers
- **Package Settings**: Set Basic and Premium plan prices
- **Admin Settings**: Configure admin email and notification settings

## File Structure

```
admin-panel/
├── index.html          # Main admin panel interface
├── styles.css          # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## Installation & Setup

### 1. Local Development
1. Download all files to your local machine
2. Open `index.html` in a modern web browser
3. The admin panel will load with sample data

### 2. Web Hosting (Strapi/Other Platforms)
1. Upload all files to your web hosting directory
2. Ensure your hosting supports HTML, CSS, and JavaScript
3. Access via your domain: `https://yourdomain.com/admin-panel/`

### 3. Strapi Integration
1. Upload files to your Strapi project's `public` folder
2. Configure Strapi to serve static files
3. Access via: `https://yourdomain.com/admin-panel/`

## Usage Guide

### Accessing the Admin Panel
- Open `index.html` in your browser
- The dashboard will load automatically with no data (empty state)
- Use the left sidebar to navigate between sections
- Use "Add Demo Request" button to test functionality

### Managing Payment Requests
1. **Navigate to "Payment Requests"** from the sidebar
2. **View Requests**: All user payment requests are displayed in a table
3. **Search/Filter**: Use the search bar and status filter to find specific requests
4. **Review Details**: Click "View" to see complete request information
5. **Take Action**: 
   - Click "Approve" to activate user account
   - Click "Reject" to deny the request
   - Approved users automatically appear in "Active Users"

### Managing Active Users
1. **Navigate to "Active Users"** from the sidebar
2. **View Users**: See all approved and active users
3. **User Actions**: 
   - Click "View Details" to see user information
   - Click "Deactivate" to remove user access
4. **Filter Users**: Use package filter to view specific user groups

### Configuring Settings
1. **Navigate to "Settings"** from the sidebar
2. **Payment Settings**: Update payment method numbers
3. **Package Settings**: Modify plan prices
4. **Admin Settings**: Configure admin email addresses
5. **Save Changes**: Click "Save Settings" for each section

## Data Management

### Data Management
The admin panel starts with no data and builds up as users submit requests:
- **Empty State**: Shows appropriate messages when no data exists
- **Real-time Updates**: Data is saved to localStorage and persists between sessions
- **Demo Mode**: Includes a demo button to add sample requests for testing

### Real Data Integration
To integrate with real data:
1. **Replace Sample Data**: Modify the data arrays in `script.js`
2. **API Integration**: Connect to your backend API for live data
3. **Database Connection**: Implement database queries for user management

## Security Features

### Admin Authentication
- **Session Management**: Secure admin sessions
- **Access Control**: Restricted access to admin functions
- **Logout Functionality**: Secure logout with confirmation

### Data Protection
- **Input Validation**: All user inputs are validated
- **XSS Prevention**: Secure rendering of user data
- **CSRF Protection**: Built-in protection against cross-site attacks

## Responsive Design

### Mobile Compatibility
- **Responsive Layout**: Works on all device sizes
- **Touch Friendly**: Optimized for mobile devices
- **Mobile Navigation**: Collapsible sidebar for small screens

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **JavaScript ES6+**: Requires modern browser support
- **CSS Grid/Flexbox**: Modern CSS layout support

## Customization

### Styling
- **Color Scheme**: Easily customizable color variables in `styles.css`
- **Layout**: Modify grid layouts and spacing
- **Typography**: Change fonts and text styling

### Functionality
- **Add Features**: Extend JavaScript functions in `script.js`
- **Modify Workflows**: Customize approval/rejection processes
- **Integrate APIs**: Connect to external services

## Troubleshooting

### Common Issues

#### Page Not Loading
- Check if all files are in the same directory
- Ensure JavaScript is enabled in your browser
- Check browser console for error messages

#### Features Not Working
- Verify all JavaScript files are loaded
- Check browser console for JavaScript errors
- Ensure Font Awesome icons are loading properly

#### Styling Issues
- Clear browser cache
- Check if CSS file is loading correctly
- Verify file paths are correct

### Browser Console Errors
- **Font Awesome**: Ensure internet connection for CDN loading
- **JavaScript**: Check for syntax errors in console
- **CSS**: Verify CSS file paths and syntax

## Future Enhancements

### Planned Features
- **Email Notifications**: Automatic email alerts for new requests
- **User Analytics**: Detailed user behavior tracking
- **Payment Gateway Integration**: Direct payment processing
- **Multi-language Support**: Additional language options
- **Advanced Reporting**: Export data to Excel/PDF

### Integration Possibilities
- **Strapi Backend**: Full CRUD operations
- **Payment Gateways**: Stripe, PayPal integration
- **Email Services**: SendGrid, Mailgun integration
- **SMS Services**: Twilio for mobile notifications

## Support & Contact

### Technical Support
- Check this README for common solutions
- Review browser console for error messages
- Ensure all files are properly uploaded

### Feature Requests
- Submit enhancement requests through your development team
- Consider custom development for specific needs
- Evaluate integration with existing systems

## License & Usage

### Usage Rights
- This admin panel is designed for CNC Auto Design software
- Modify and customize as needed for your requirements
- Ensure compliance with your organization's policies

### Distribution
- Share with your development team
- Use in production environments
- Modify for other similar projects

---

**Note**: This admin panel is designed to work independently and can be easily integrated with various backend systems including Strapi, custom APIs, or database systems.
