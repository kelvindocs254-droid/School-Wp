# St. Francis School Portal - WordPress CPT Plugin

This folder contains a custom WordPress plugin developed using the latest OO **PHP 8.0+** best practices. It adds a searchable and filterable school directory and an events calendar to any standard WordPress site.

## Features

1. **Staff Directory (`[st_francis_staff_directory]`)**
   - Implements a dedicated "Staff Directory" post type.
   - Dynamic taxonomies to organize staff by department.
   - Clean AJAX-like dynamic search and filter system styled with modern CSS.

2. **Events Calendar (`[st_francis_events_calendar]`)**
   - Implements a dedicated "Events Calendar" post type.
   - Built-in categorization (e.g., Academic, Holiday, Arts, Sports).
   - Allows users to filter scheduled events directly by month and category with smooth transitions.

## Installation Instructions

1. **Prepare the Plugin File**
   - Export this workspace or download this `/php-wordpress-plugin` directory.
   - Compress the `/php-wordpress-plugin` folder into a `.zip` archive named `st-francis-school-portal.zip`.

2. **Upload & Activate**
   - Go to your WordPress Administrative Dashboard.
   - Navigate to **Plugins** -> **Add New** -> **Upload Plugin**.
   - Select the `st-francis-school-portal.zip` file and click **Install Now**.
   - Once uploaded successfully, click **Activate Plugin**.

3. **Manage School Data**
   - After activation, you will see two new custom tabs in the WordPress Left Sidebar Menu:
     - **Staff Directory**: Click "Add New Staff Member", input their name, upload a featured image (their photo), and enter their Role, Email, and Phone number in the custom admin form.
     - **Events Calendar**: Click "Add New School Event", select an event date using the built-in calendar picker, configure the time/location, and add a detailed event description in the text editor.

4. **Display widgets on Pages**
   - Create a page on your site for the staff directory (e.g. `/staff-directory`) and paste the shortcode:
     ```text
     [st_francis_staff_directory]
     ```
   - Create a page on your site for school events (e.g. `/events`) and paste the shortcode:
     ```text
     [st_francis_events_calendar]
     ```
   - Publish the pages to view the fully responsive, functional lists!
