<?php
/**
 * Plugin Name: St. Francis School Portal
 * Plugin URI:  https://stfrancis.edu
 * Description: A searchable staff directory and categorized events calendar for St. Francis Primary and Junior Secondary School.
 * Version:     1.0.0
 * Author:      St. Francis IT Division
 * License:     GPL2
 * Requires PHP: 8.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Class StFrancisSchoolPortal
 * Main plugin class managing Custom Post Types, Shortcodes, and admin views.
 */
class StFrancisSchoolPortal {

    public function __construct() {
        // Core Hooks
        add_action('init', [$this, 'register_custom_post_types']);
        add_action('init', [$this, 'register_taxonomies']);
        add_action('add_meta_boxes', [$this, 'add_custom_meta_boxes']);
        add_action('save_post', [$this, 'save_custom_meta_fields'], 10, 2);
        
        // Shortcodes
        add_shortcode('st_francis_staff_directory', [$this, 'render_staff_directory']);
        add_shortcode('st_francis_events_calendar', [$this, 'render_events_calendar']);

        // Frontend Styles / Scripts
        add_action('wp_enqueue_scripts', [$this, 'enqueue_portal_assets']);
    }

    /**
     * Enqueue CSS/JS for filterable lists (Tailwind supported or custom clean CSS styling)
     */
    public function enqueue_portal_assets(): void {
        wp_enqueue_script('jquery');
        
        // Add visual styling for the directory and calendar widgets
        wp_register_style('st-francis-portal-css', false);
        wp_enqueue_style('st-francis-portal-css');
        
        $custom_css = "
            .sf-portal-wrapper { font-family: 'Inter', system-ui, sans-serif; max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
            .sf-search-bar { width: 100%; max-width: 400px; padding: 12px 20px; border: 2px solid #e2e8f0; border-radius: 16px; outline: none; transition: all 0.2s; font-size: 16px; font-weight: 600; }
            .sf-search-bar:focus { border-color: #4f46e5; }
            .sf-filter-btn { padding: 8px 18px; border-radius: 9999px; font-size: 14px; font-weight: 800; border: none; background: #f1f5f9; color: #64748b; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
            .sf-filter-btn.active { background: #4f46e5; color: #ffffff; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3); }
            .sf-staff-grid { display: grid; grid-template-cols: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem; }
            .sf-card { background: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.3s; display: flex; flex-direction: column; }
            .sf-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); }
            .sf-card-img { height: 260px; width: 100%; object-fit: cover; }
            .sf-card-body { padding: 1.5rem; }
            .sf-card-dept { font-size: 10px; font-weight: 900; letter-spacing: 0.15em; color: #4f46e5; text-transform: uppercase; margin-bottom: 0.5rem; }
            .sf-card-name { font-size: 1.25rem; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
            .sf-card-role { font-size: 0.875rem; font-weight: 700; color: #94a3b8; }
            .sf-card-contacts { margin-top: 1rem; border-top: 1px solid #f1f5f9; padding-top: 1rem; display: flex; gap: 8px; font-size: 13px; font-weight: 600; }
            .sf-card-link { color: #4f46e5; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; }
            .sf-event-item { background: #ffffff; border-radius: 32px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.02); padding: 2rem; display: flex; align-items: center; gap: 2rem; margin-bottom: 1.5rem; transition: all 0.2s; }
            .sf-event-item:hover { transform: scale(1.01); border-color: rgba(79, 70, 229, 0.2); }
            .sf-badge-date { width: 80px; height: 80px; background: #f8fafc; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #e2e8f0; font-weight: 900; color: #0f172a; }
            .sf-badge-month { font-size: 11px; text-transform: uppercase; color: #94a3b8; }
            .sf-badge-day { font-size: 2rem; line-height: 1; }
        ";
        wp_add_inline_style('st-francis-portal-css', $custom_css);
    }

    /**
     * Register Custom Post Types: Staff & Events
     */
    public function register_custom_post_types(): void {
        // Post Type: Staff Member
        register_post_type('staff_member', [
            'labels'      => [
                'name'          => __('Staff Directory', 'st-francis'),
                'singular_name' => __('Staff Member', 'st-francis'),
                'add_new_item'  => __('Add New Staff Member', 'st-francis'),
                'edit_item'     => __('Edit Staff Member', 'st-francis'),
            ],
            'public'      => true,
            'has_archive' => true,
            'menu_icon'   => 'dashicons-businessman',
            'supports'    => ['title', 'thumbnail'],
            'rewrite'     => ['slug' => 'staff'],
        ]);

        // Post Type: School Event
        register_post_type('school_event', [
            'labels'      => [
                'name'          => __('Events Calendar', 'st-francis'),
                'singular_name' => __('School Event', 'st-francis'),
                'add_new_item'  => __('Add New School Event', 'st-francis'),
                'edit_item'     => __('Edit School Event', 'st-francis'),
            ],
            'public'      => true,
            'has_archive' => true,
            'menu_icon'   => 'dashicons-calendar-alt',
            'supports'    => ['title', 'editor'],
            'rewrite'     => ['slug' => 'school-events'],
        ]);
    }

    /**
     * Register custom taxonomies (Departments and Event Categories)
     */
    public function register_taxonomies(): void {
        // Staff Departments
        register_taxonomy('staff_department', 'staff_member', [
            'labels' => [
                'name'          => __('Departments', 'st-francis'),
                'singular_name' => __('Department', 'st-francis'),
            ],
            'hierarchical' => true,
            'show_ui'      => true,
        ]);

        // Event Categories
        register_taxonomy('event_category', 'school_event', [
            'labels' => [
                'name'          => __('Categories', 'st-francis'),
                'singular_name' => __('Category', 'st-francis'),
            ],
            'hierarchical' => true,
            'show_ui'      => true,
        ]);
    }

    /**
     * Custom Administration Fields for CPTs
     */
    public function add_custom_meta_boxes(): void {
        add_meta_box('staff_meta', __('Staff Contacts', 'st-francis'), [$this, 'render_staff_metabox'], 'staff_member', 'normal', 'high');
        add_meta_box('event_meta', __('Event Details', 'st-francis'), [$this, 'render_event_metabox'], 'school_event', 'normal', 'high');
    }

    // Staff Meta Content
    public function render_staff_metabox(WP_Post $post): void {
        $role  = get_post_meta($post->ID, '_staff_role', true);
        $email = get_post_meta($post->ID, '_staff_email', true);
        $phone = get_post_meta($post->ID, '_staff_phone', true);
        wp_nonce_field('save_staff_details', 'staff_nonce');
        ?>
        <p>
            <label for="staff_role" style="font-weight:bold; display:block; margin-bottom:5px;">Professional Role</label>
            <input type="text" id="staff_role" name="staff_role" value="<?php echo esc_attr($role); ?>" class="widefat" placeholder="e.g. Science Teacher" />
        </p>
        <p>
            <label for="staff_email" style="font-weight:bold; display:block; margin-bottom:5px;">Professional Email</label>
            <input type="email" id="staff_email" name="staff_email" value="<?php echo esc_attr($email); ?>" class="widefat" placeholder="e.g. name@stfrancis.edu" />
        </p>
        <p>
            <label for="staff_phone" style="font-weight:bold; display:block; margin-bottom:5px;">Contact Phone</label>
            <input type="text" id="staff_phone" name="staff_phone" value="<?php echo esc_attr($phone); ?>" class="widefat" placeholder="e.g. +1 (555) 765-4321" />
        </p>
        <?php
    }

    // Event Meta Content
    public function render_event_metabox(WP_Post $post): void {
        $date     = get_post_meta($post->ID, '_event_date', true);
        $time     = get_post_meta($post->ID, '_event_time', true);
        $location = get_post_meta($post->ID, '_event_location', true);
        wp_nonce_field('save_event_details', 'event_nonce');
        ?>
        <p>
            <label for="event_date" style="font-weight:bold; display:block; margin-bottom:5px;">Event Date</label>
            <input type="date" id="event_date" name="event_date" value="<?php echo esc_attr($date); ?>" class="widefat" />
        </p>
        <p>
            <label for="event_time" style="font-weight:bold; display:block; margin-bottom:5px;">Event Time</label>
            <input type="text" id="event_time" name="event_time" value="<?php echo esc_attr($time); ?>" class="widefat" placeholder="e.g. 10:00 AM" />
        </p>
        <p>
            <label for="event_location" style="font-weight:bold; display:block; margin-bottom:5px;">Location</label>
            <input type="text" id="event_location" name="event_location" value="<?php echo esc_attr($location); ?>" class="widefat" placeholder="e.g. Primary School Great Hall" />
        </p>
        <?php
    }

    /**
     * Save Post values
     */
    public function save_custom_meta_fields(int $post_id, WP_Post $post): void {
        // Staff save
        if (isset($_POST['staff_nonce']) && wp_verify_nonce($_POST['staff_nonce'], 'save_staff_details')) {
            update_post_meta($post_id, '_staff_role', sanitize_text_field($_POST['staff_role']));
            update_post_meta($post_id, '_staff_email', sanitize_email($_POST['staff_email']));
            update_post_meta($post_id, '_staff_phone', sanitize_text_field($_POST['staff_phone']));
        }

        // Event save
        if (isset($_POST['event_nonce']) && wp_verify_nonce($_POST['event_nonce'], 'save_event_details')) {
            update_post_meta($post_id, '_event_date', sanitize_text_field($_POST['event_date']));
            update_post_meta($post_id, '_event_time', sanitize_text_field($_POST['event_time']));
            update_post_meta($post_id, '_event_location', sanitize_text_field($_POST['event_location']));
        }
    }

    /**
     * Shortcode: Renders a beautifully styled searchable Staff Directory widget on frontend
     */
    public function render_staff_directory(array $atts = []): string {
        ob_start();

        // Query all departments for tabs
        $departments = get_terms([
            'taxonomy' => 'staff_department',
            'hide_empty' => false,
        ]);

        $args = [
            'post_type'      => 'staff_member',
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC'
        ];
        
        $query = new WP_Query($args);
        ?>
        <div class="sf-portal-wrapper">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
                <!-- Search Input bar -->
                <input type="text" id="sf-staff-search" class="sf-search-bar" placeholder="Search by name..." />
                
                <!-- Filter Tabs -->
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="sf-filter-btn active" data-dept="all">All Departments</button>
                    <?php foreach ($departments as $dept): ?>
                        <button class="sf-filter-btn" data-dept="<?php echo esc_attr($dept->slug); ?>">
                            <?php echo esc_html($dept->name); ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="sf-staff-grid" id="sf-staff-list">
                <?php if ($query->have_posts()): while ($query->have_posts()): $query->the_post(); 
                    $role  = get_post_meta(get_the_ID(), '_staff_role', true);
                    $email = get_post_meta(get_the_ID(), '_staff_email', true);
                    $phone = get_post_meta(get_the_ID(), '_staff_phone', true);
                    $photo_url = get_the_post_thumbnail_url(get_the_ID(), 'medium') ?: 'https://picsum.photos/seed/wp_staff_' . get_the_ID() . '/400/500';
                    
                    $depts = get_the_terms(get_the_ID(), 'staff_department');
                    $dept_slugs = [];
                    $dept_names = [];
                    if ($depts) {
                        foreach ($depts as $d) {
                            $dept_slugs[] = $d->slug;
                            $dept_names[] = $d->name;
                        }
                    }
                    ?>
                    <div class="sf-card" data-depts="<?php echo esc_attr(implode(',', $dept_slugs)); ?>" data-name="<?php echo esc_attr(strtolower(get_the_title())); ?>">
                        <img src="<?php echo esc_url($photo_url); ?>" class="sf-card-img" alt="<?php echo esc_attr(get_the_title()); ?>" />
                        <div class="sf-card-body">
                            <div class="sf-card-dept"><?php echo esc_html(implode(', ', $dept_names) ?: 'Faculty'); ?></div>
                            <h3 class="sf-card-name"><?php the_title(); ?></h3>
                            <div class="sf-card-role"><?php echo esc_html($role); ?></div>
                            
                            <div class="sf-card-contacts">
                                <?php if ($email): ?>
                                    <a href="mailto:<?php echo esc_attr($email); ?>" class="sf-card-link">✉ Email</a>
                                <?php endif; ?>
                                <?php if ($phone): ?>
                                    <a href="tel:<?php echo esc_attr($phone); ?>" class="sf-card-link" style="margin-left:auto;">📞 Call</a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endwhile; wp_reset_postdata(); endif; ?>
            </div>
        </div>

        <script>
        jQuery(document).ready(function($) {
            function filterStaff() {
                var search = $('#sf-staff-search').val().toLowerCase();
                var activeDept = $('.sf-filter-btn.active').data('dept');

                $('#sf-staff-list .sf-card').each(function() {
                    var name = $(this).data('name');
                    var depts = ($(this).data('depts') + '').split(',');
                    
                    var matchesSearch = name.includes(search);
                    var matchesDept = (activeDept === 'all' || depts.includes(activeDept));

                    if (matchesSearch && matchesDept) {
                        $(this).fadeIn();
                    } else {
                        $(this).fadeOut();
                    }
                });
            }

            $('#sf-staff-search').on('keyup input', filterStaff);
            
            $('.sf-filter-btn').on('click', function() {
                $('.sf-filter-btn').removeClass('active');
                $(this).addClass('active');
                filterStaff();
            });
        });
        </script>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: Renders a beautifully styled Events Calendar widget on frontend with category and month filtering
     */
    public function render_events_calendar(array $atts = []): string {
        ob_start();

        // Get Event Categories for filter
        $event_cats = get_terms([
            'taxonomy' => 'event_category',
            'hide_empty' => false,
        ]);

        $args = [
            'post_type'      => 'school_event',
            'posts_per_page' => -1,
            'orderby'        => 'meta_value',
            'meta_key'       => '_event_date',
            'order'          => 'ASC'
        ];
        
        $query = new WP_Query($args);
        $months_list = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        ?>
        <div class="sf-portal-wrapper">
            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; background: #f8fafc; padding: 1.5rem; border-radius: 24px; border: 1px solid #e2e8f0;">
                <div>
                    <span style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Filter by Month</span>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                        <?php foreach ($months_list as $m): ?>
                            <button class="sf-month-btn <?php echo $m === 'All' ? 'active' : ''; ?>" data-month="<?php echo esc_attr($m); ?>" style="padding:6px 14px; border-radius:9999px; font-size:12px; font-weight:800; border:none; cursor:pointer; background:#ffffff; border:1px solid #e2e8f0; color:#64748b;">
                                <?php echo esc_html($m); ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div>
                    <span style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Filter by Category</span>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                        <button class="sf-cat-btn active" data-cat="all" style="padding:6px 14px; border-radius:9999px; font-size:12px; font-weight:800; border:none; cursor:pointer; background:#ffffff; border:1px solid #e2e8f0; color:#64748b;">All</button>
                        <?php foreach ($event_cats as $cat): ?>
                            <button class="sf-cat-btn" data-cat="<?php echo esc_attr($cat->slug); ?>" style="padding:6px 14px; border-radius:9999px; font-size:12px; font-weight:800; border:none; cursor:pointer; background:#ffffff; border:1px solid #e2e8f0; color:#64748b;">
                                <?php echo esc_html($cat->name); ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <style>
                .sf-month-btn.active, .sf-cat-btn.active { background: #4f46e5 !important; color: #ffffff !important; border-color: #4f46e5 !important; }
            </style>

            <div id="sf-event-list">
                <?php if ($query->have_posts()): while ($query->have_posts()): $query->the_post(); 
                    $date     = get_post_meta(get_the_ID(), '_event_date', true); // formatted Y-m-d
                    $time     = get_post_meta(get_the_ID(), '_event_time', true);
                    $location = get_post_meta(get_the_ID(), '_event_location', true);

                    $cats = get_the_terms(get_the_ID(), 'event_category');
                    $cat_slugs = [];
                    $cat_names = [];
                    if ($cats) {
                        foreach ($cats as $c) {
                            $cat_slugs[] = $c->slug;
                            $cat_names[] = $c->name;
                        }
                    }

                    // Format Date fields
                    $day = '';
                    $month_name = 'EVENT';
                    $full_month_name = '';
                    if ($date) {
                        $timestamp = strtotime($date);
                        $day = date('j', $timestamp);
                        $month_name = date('M', $timestamp);
                        $full_month_name = date('F', $timestamp);
                    }
                    ?>
                    <div class="sf-event-item" data-cats="<?php echo esc_attr(implode(',', $cat_slugs)); ?>" data-month="<?php echo esc_attr($full_month_name); ?>">
                        <div class="sf-badge-date">
                            <span class="sf-badge-month"><?php echo esc_html($month_name); ?></span>
                            <span class="sf-badge-day"><?php echo esc_html($day); ?></span>
                        </div>

                        <div style="flex:1;">
                            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                                <span style="background: rgba(79, 70, 229, 0.08); color: #4f46e5; padding: 4px 10px; border-radius: 9999px;">
                                    <?php echo esc_html(implode(', ', $cat_names) ?: 'Event'); ?>
                                </span>
                                <?php if ($time): ?>
                                    <span style="background: #f1f5f9; color: #64748b; padding: 4px 10px; border-radius: 9999px;">
                                        🕗 <?php echo esc_html($time); ?>
                                    </span>
                                <?php endif; ?>
                                <?php if ($location): ?>
                                    <span style="background: #f1f5f9; color: #64748b; padding: 4px 10px; border-radius: 9999px;">
                                        📍 <?php echo esc_html($location); ?>
                                    </span>
                                <?php endif; ?>
                            </div>
                            <h3 style="font-size: 1.5rem; font-weight: 900; color: #0f172a; margin: 0 0 8px 0;"><?php the_title(); ?></h3>
                            <div style="font-size: 15px; color: #64748b; font-weight: 500; line-height: 1.6;"><?php the_content(); ?></div>
                        </div>
                    </div>
                <?php endwhile; wp_reset_postdata(); endif; ?>
            </div>
        </div>

        <script>
        jQuery(document).ready(function($) {
            function filterEvents() {
                var activeMonth = $('.sf-month-btn.active').data('month');
                var activeCat = $('.sf-cat-btn.active').data('cat');

                $('#sf-event-list .sf-event-item').each(function() {
                    var month = $(this).data('month');
                    var cats = ($(this).data('cats') + '').split(',');
                    
                    var matchesMonth = (activeMonth === 'All' || month === activeMonth);
                    var matchesCat = (activeCat === 'all' || cats.includes(activeCat));

                    if (matchesMonth && matchesCat) {
                        $(this).fadeIn();
                    } else {
                        $(this).fadeOut();
                    }
                });
            }

            $('.sf-month-btn').on('click', function() {
                $('.sf-month-btn').removeClass('active');
                $(this).addClass('active');
                filterEvents();
            });

            $('.sf-cat-btn').on('click', function() {
                $('.sf-cat-btn').removeClass('active');
                $(this).addClass('active');
                filterEvents();
            });
        });
        </script>
        <?php
        return ob_get_clean();
    }
}

// Instantiate the plugin
new StFrancisSchoolPortal();
