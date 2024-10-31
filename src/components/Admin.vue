<script setup>

</script>



<template >
    <div>
        
        <nav class="nav-container">
      <div class="nav-links">
        <router-link to="/admin" class="nav-link">Dashboard</router-link>
        <router-link to="/admin/manager-user" class="nav-link-active">Manager User</router-link>
        <router-link to="/admin/manager-product" class="nav-link">Manager Product</router-link>
      </div>
    </nav>
    <RouterView></RouterView>
    </div>
</template>

<style>
.dashboard {
    min-height: 100vh;
    background-color: #ffffff;
}

.nav-container {
    background-color: #000000;
    color: #ffffff;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-link {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: #1f2937;
}

.nav-link-active {
    padding: 0.5rem 1rem;
    background-color: #1f2937;
    border-radius: 0.25rem;
    color: #ffffff;
}
</style>
