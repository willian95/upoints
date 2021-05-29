<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <NuxtLink :to="{ path: '/register'}" class="nav-link">Registrarme <span class="sr-only">(current)</span></NuxtLink>
                </li>
                <li class="nav-item active">
                    <NuxtLink :to="{ path: '/login'}" class="nav-link">Login <span class="sr-only">(current)</span></NuxtLink>
                </li>
            </ul>
            
        </div>
    </nav>

</template>

<script>
    export default {
        
        name:"navbar"

    }
</script>