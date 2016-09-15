import { initializeStore } from './state/store';
import { render } from './render';

/**
 * TODO
 * Server - send same response -> check if valid route
 * Persist data
 * Translations
 * Loading spinner component
 * Error handlers
 * 404 page component
 * Mobile adaptation
 * Old browsers adaptation
 * Get add customer and delete customer confirmation from backend
 * validation (for new customer form input)
 * Add fields to new customer form: image, birthdate
 * pagination
 * npm symlinks for root level
 * Tests
 */
function bootstrap() {
    var jQuery = require('jquery');
    window.jQuery = window.$ = jQuery;
    require('bootstrap/dist/js/bootstrap');

    var store = initializeStore();
    render(store);
}
bootstrap();
