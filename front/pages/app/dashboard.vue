<template>
  
	<div class="container">
		<div class="row">
			<div class="col-md-4" v-if="$auth.user.role_id == 2">
				
				<div class="card card-custom card-shadowless gutter-b">
					<!--begin::Body-->
					<div class="card-body my-3">
						<a href="#" class="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block">Puntos acumulados</a>
						<div class="font-weight-bold text-muted font-size-sm">
							<span class="text-dark-75 font-size-h2 font-weight-bolder mr-2">{{ $auth.user.points }}</span>puntos
						</div>
					</div>
					<!--end:: Body-->
				</div>
				
			</div>
			<div class="col-md-4" v-if="$auth.user.role_id == 2">
				
				<div class="card card-custom card-shadowless gutter-b">
					<!--begin::Body-->
					<div class="card-body my-3">
						<a href="#" class="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block">Tiendas Afilidas</a>
						<div class="font-weight-bold text-muted font-size-sm">
						<span class="text-dark-75 font-size-h2 font-weight-bolder mr-2">0</span>tiendas</div>
					</div>
					<!--end:: Body-->
				</div>
				
			</div>
			<div class="col-md-4" v-if="$auth.user.role_id == 2">
				
				<div class="card card-custom card-shadowless gutter-b">
					<!--begin::Body-->
					<div class="card-body my-3">
						<a href="#" class="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block">Premios reclamados</a>
						<div class="font-weight-bold text-muted font-size-sm">
						<span class="text-dark-75 font-size-h2 font-weight-bolder mr-2">0</span>premios</div>
					</div>
					<!--end:: Body-->
				</div>
				
			</div>
			<div class="col-md-4" v-if="$auth.user.role_id == 2">
				
				<div class="card card-custom card-shadowless gutter-b">
					<!--begin::Body-->
					<div class="card-body">
						<a href="#" class="card-title font-weight-bolder text-success text-hover-state-dark font-size-h6 mb-4 d-block">Mi QR</a>
						<p class="text-center">
							<vue-qr :text="$auth.user.user_identification+'-'+$auth.user.nickname" style="width: 100%;"></vue-qr>
						</p>
					</div>
					<!--end:: Body-->
				</div>
				
			</div>
			<div class="col-md-8">
				<client-only>
					<div class="card" style="max-height: 350px; overflow-y: auto">
						<div class="card-body">

							<line-chart :data="chartData"></line-chart>
						</div>

					</div>
				</client-only>
			</div>

		</div>

	</div>

</template>

<script>
	export default {
		middleware:"auth",
		auth:"auth",
		layout:"default",
		data(){
			return{
				chartData: {
					labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
					datasets: [
						{
							label: 'Puntos por mes',
							data: [45, 55, 48, 45, 30],
							borderColor: "#00b894",
							backgroundColor:"#00b894",
							fill: false,
						}
					],
					options: {
						responsive: true,
						interaction: {
						mode: 'index',
						intersect: false,
						},
						stacked: false,
						scales: {
							y: {
								type: 'linear',
								display: true,
								position: 'left',
							},
							y1: {
								type: 'linear',
								display: true,
								position: 'right',

								// grid line settings
								grid: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
								},
							},
						}
					}
				}
			}
		}	
	}
</script>