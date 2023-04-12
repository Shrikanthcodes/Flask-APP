document.addEventListener("DOMContentLoaded", function() {
    // Get the color filter dropdown element
    const colorFilter = document.getElementById("color");

    if (colorFilter) {
        // Add an event listener to the color filter dropdown
        colorFilter.addEventListener("change", function() {
            // Submit the form when the dropdown value changes
            this.form.submit();
        });
    }
});
