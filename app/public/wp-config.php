<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'wZ/-zOm^}+1C+^[.U4Wm)lMv@gYDhPO4BxDbR>(=[P)-*r]:}YcyW9G::-n}8p(#' );
define( 'SECURE_AUTH_KEY',   ']oULnY`}kVJ9SMr:0xHqKAvzd%g8jA[Ivz;YL^E_{ee?M~;=FepO,;X+5 CpQQu1' );
define( 'LOGGED_IN_KEY',     'YO//t0//f/>i7g_s]_W65wrE5KxYhpD!-TrJPcvP||*;N a_0?06gRRcB,aV2! =' );
define( 'NONCE_KEY',         'j6mFq+,CF[pP5H :wNb#5A/`kJe9<}NS$_ Y.JGNpMImMJ)~NrBn=#,^pU<^hDL`' );
define( 'AUTH_SALT',         '[SU@lgXo qf=Mk1.M5SRmm5N]FIVn9)Hw_pO.l 0w`yX25)Pf6bAW6;WbRlF1*Bp' );
define( 'SECURE_AUTH_SALT',  '=N|EL@RsTzf-Bsj{REL%rZ2.d;pP]dL-x3qQ:_VyT{qS_5EA#3@pYH? GINYz&PR' );
define( 'LOGGED_IN_SALT',    '_*VFuK,qjgT8bN~[M~RG9WVHVv05(O,mvOz@%[G(LKvwm]][Foxh)t//QO]-H~y.' );
define( 'NONCE_SALT',        '23ktV9x:j4Io}[Fw-sAv_TLH.s$K@$a*]nrX~qcO`ZO=W/*/c3wUs5/yWt{)2qkC' );
define( 'WP_CACHE_KEY_SALT', ']~-[fEBCepU8oE2n-9z50(#tiyj()kg:] 9u(&/m|w+` #/%,th8vVlF];PTU`Uk' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
