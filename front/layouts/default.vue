<template>
  <!--begin::Body-->
	<div id="kt_body" class="header-fixed header-mobile-fixed sidebar-enabled page-loading">
		<!--begin::Main-->
		<!--begin::Header Mobile-->
		<div id="kt_header_mobile" class="header-mobile header-mobile-fixed">
			<!--begin::Logo-->
			<a href="index.html">
				<img alt="Logo" src="assets/media/logos/logo-letter-1.png" class="logo-default max-h-30px" />
			</a>
			<!--end::Logo-->
			<!--begin::Toolbar-->
			<div class="d-flex align-items-center">
				<button class="btn rounded-0 p-0 burger-icon burger-icon-left" id="kt_header_mobile_toggle" @click="toggleNavbar()">
					<span></span>
				</button>
			</div>
			<!--end::Toolbar-->
		</div>
		<!--end::Header Mobile-->
		<div class="d-flex flex-column flex-root">
			<!--begin::Page-->
			<div class="d-flex flex-row flex-column-fluid page">
				<!--begin::Aside-->
				<sidebar />
				<!--end::Aside-->
				<!--begin::Wrapper-->
				<div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
					<!--begin::Header-->
					<div id="kt_header" class="header header-fixed">
						<!--begin::Header Wrapper-->
						<div class="header-wrapper rounded-top-xl d-flex flex-grow-1 align-items-center">
							<!--begin::Container-->
							<div class="container-fluid d-flex align-items-center justify-content-end justify-content-lg-between flex-wrap">
								<!--begin::Menu Wrapper-->
								<div class="header-menu-wrapper header-menu-wrapper-left py-lg-2 header-menu-wrapper-on" id="kt_header_menu_wrapper" v-if="openSidebar == true">
									<!--begin::Menu-->
									<div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">

										<ul class="menu-nav">
											<!--begin::Item-->
											<li class="menu-item" @click="toggleNavbar()">
												<NuxtLink :to="'/app/profile'" class="menu-link menu-toggle" data-toggle="tab" data-target="#kt_aside_tab_4" role="tab" >
													<img src="/images/profile.svg" alt="">
													<span class="menu-text">Perfil</span>
													<span class="menu-desc"></span>
												</NuxtLink>
											</li>
											<!--end::Item-->

											<!--begin::Item-->
											<li class="menu-item" v-if="$auth.user.role_id == 3" @click="toggleNavbar()">
												<NuxtLink :to="'/app/scanner'" class="menu-link menu-toggle" data-toggle="tab" data-target="#kt_aside_tab_4" role="tab" >
													<img src="/images/qr.svg" alt="">
													<span class="menu-text">Scanner</span>
													<span class="menu-desc"></span>
												</NuxtLink>
											</li>
											<!--end::Item-->

											<!--begin::Item-->
											<li class="menu-item" @click="signOut()">
												<a href="#" class="menu-link menu-toggle" data-toggle="tab" data-target="#kt_aside_tab_4" role="tab" >
													<fa icon="sign-out-alt" class="mr-1" style="font-size: 20px;"></fa>
													<span class="menu-text">Cerrar sesión</span>
													<span class="menu-desc"></span>
												</a>
											</li>
											<!--end::Item-->
										</ul>
										
									</div>
									<!--end::Menu-->
								</div>
								<!--end::Menu Wrapper-->
								
							</div>
							<!--end::Container-->
						</div>
						<!--end::Header Wrapper-->
					</div>
					<!--end::Header-->
					<!--begin::Content-->
					<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
						<!--begin::Entry-->
						<div class="d-flex flex-column-fluid">
							<!--begin::Container-->
							<div class="container">
								<!--begin::Dashboard-->
								<Nuxt />
								<!--end::Dashboard-->
							</div>
							<!--end::Container-->
						</div>
						<!--end::Entry-->
					</div>
					<!--end::Content-->
					<!--begin::Footer-->
					<div class="footer py-2 py-lg-0 my-5 d-flex flex-lg-column" id="kt_footer">
						<!--begin::Container-->
						<div class="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
							<!--begin::Copyright-->
							<div class="text-dark order-2 order-md-1">
								<span class="text-muted font-weight-bold mr-2">2020©</span>
								<a href="http://keenthemes.com/metronic" target="_blank" class="text-dark-75 text-hover-primary">Keenthemes</a>
							</div>
							<!--end::Copyright-->
							<!--begin::Nav-->
							<div class="nav nav-dark order-1 order-md-2">
								<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pr-3 pl-0">About</a>
								<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link px-3">Team</a>
								<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-3 pr-0">Contact</a>
							</div>
							<!--end::Nav-->
						</div>
						<!--end::Container-->
					</div>
					<!--end::Footer-->
				</div>
				<!--end::Wrapper-->
				<!--begin::Aside Secondary-->
				
				<!--end::Aside Secondary-->
			</div>
			<!--end::Page-->
		</div>
		<!--end::Main-->
	</div>
	<!--end::Body-->
</template>

<script>
	import sidebar from "../components/dashboard/sidebar"
	export default {
		data(){
			return{
				openSidebar:false
			}
		},
		components: {sidebar},
		methods:{
			toggleNavbar(){
				
				this.openSidebar == true ? this.openSidebar = false : this.openSidebar = true 

			},
			async signOut(){
				await this.$auth.logout()
				this.$auth.redirect('login')
			}
		}
	}
</script>

<style>
	.wrapper{
		background-color: #fff;
	}


	.text-bold{
		font-weight: bold;
	}
</style>
