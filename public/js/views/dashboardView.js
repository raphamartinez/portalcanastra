var $ = document.querySelector.bind(document)
var cores = ['amaraloG', 'pretoG', 'roxoG', 'azulG', 'marimG', 'verdeG', 'laranjaG', 'ouroG', 'cimentoG', 'verdeclaroG']

// let cor = cores[Math.round(Math.random() * 9)]
let header = document.querySelector('[data-header]')
let footer = document.querySelector('[data-footer]')

const showHeader = async () => {
    header.innerHTML = `   

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="dashboard.html">
                <div class="sidebar-brand-icon img-fluid mb-2 mx-auto">
                    <img src="../img/ansalogomin.png" alt="Ansa Logo">
                </div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider pt-3">

            <!-- Heading -->
            <div class="sidebar-heading">
                Interface
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReportes"
                    aria-expanded="true" aria-controls="collapseReportes">
                    <i class="fas fa-file-alt fa-cog"></i>
                    <span>Informes</span>
                </a>
                <div id="collapseReportes" class="collapse" aria-labelledby="headingTwo"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item" href="" id="btnSimpleBi" data-btnSimpleBI>Painel de PowerBI</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Utilities Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseArticulo"
                    aria-expanded="true" aria-controls="collapseArticulo">
                    <i class="fas fa-cube "></i>
                    <span>Articulos</span>
                </a>
                <div id="collapseArticulo" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="">Pesquisa por Articulo</a>
                    </div>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProsegur"
                    aria-expanded="true" aria-controls="collapseProsegur">
                    <i class="fas fa-shield-alt "></i>
                    <span>Prosegur</span>
                </a>
                <div id="collapseProsegur" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="">Mirar Sucursales</a>
                        <a class="collapse-item" href="">Mirar Vehículos</a>
                    </div>
                </div>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Painel
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-user-cog fa-folder"></i>
                    <span>Administración</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Paneles:</h6>
                        <a class="collapse-item" href="">Panel de usuarios</a>
                        <a class="collapse-item" href="">Panel de ventas</a>
                        <a class="collapse-item" href="">Panel de PowerBI</a>
                    </div>
                </div>
            </li>



            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <!-- Sidebar Message
            <div class="sidebar-card d-none d-lg-flex">
                <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
                <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div> -->

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Search -->
                    <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small"
                                placeholder="Pesquisa por articulo..." aria-label="Search"
                                aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Pesquisa por articulo..." aria-label="Search"
                                            aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <!-- Nav Item - Alerts -->
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-bell fa-fw"></i>
                                <!-- Counter - Alerts -->
                                <!-- <span class="badge badge-danger badge-counter">3+</span> -->
                            </a>
                            <!-- Dropdown - Alerts -->
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 class="dropdown-header">
                                    Centro de Alerta
                                </h6>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="fas fa-bell-slash text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <!-- <div class="small text-gray-500"></div> -->
                                        <span class="font-weight">No hay notificaciones nuevas.</span>
                                    </div>
                                </a>
                                <!-- <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a> -->
                            </div>
                        </li>

                        <!-- Nav Item - Messages -->
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-envelope fa-fw"></i>
                                <!-- Counter - Messages -->
                                <!-- <span class="badge badge-danger badge-counter"></span> -->
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 class="dropdown-header">
                                    Centro de Mensajes
                                </h6>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="fas fa-envelope text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="text-truncate">No hay mensaje nuevas</div>
                                        <!-- <div class="small text-gray-500"></div> -->
                                    </div>
                                </a>
                                <!-- <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a> -->
                            </div>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray small" data-username></span>
                                <div class="icon-circle bg-light">
                                    <i class="fas fa-user"></i>
                                </div>
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Perfil
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Ajustes
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Historial de Acceso
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Salir
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="container-fluid">
                <div class="row" id="cardHistory"></div>
    <div class="row">
        <div id="powerbi">
        </div>
    </div>
</div>
</div>`
}


const showFooter = async () => {
    footer.innerHTML = `<footer class="sticky-footer bg-white">
<div class="container my-auto">
    <div class="copyright text-center my-auto">
        <span>Copyright Raphael Martinez &copy; America Neumaticos S.A 2021</span>
    </div>
</div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
<i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Cerrar sesión?</h5>
    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>
<div class="modal-body">Seleccione salir si desea finalizar la sesión.</div>
<div class="modal-footer">
    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
    <a class="btn btn-primary" href="../public/login.html">Salir</a>
</div>
</div>
</div>
</div>
`
}


const showCardHistory = (cardHistory, history) => {
    cardHistory.innerHTML = ` <div class="col-xl-6 col-md-6 mb-4">
<div class="card border-left-primary shadow h-100 py-2">
    <div class="card-body">
        <div class="row no-gutters align-items-center">
            <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Historial de Acceso
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">En las ultimas 24 horas había ${history.count.count} accesos</div>
                <div class="h8 mb-0 font-weight-bold text-gray-600">El último acceso fue ${history.lastAccess.name} a ${history.lastAccess.time}</div>
            </div>
            <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
        </div>
    </div>
</div>
</div>`

}

const showCardBd = () => {
    let div = document.createElement('div');

    div.className = "col-xl-6 col-md-6 mb-4"

    div.innerHTML =` 
    <div class="card border-left-info shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Actualizacion Ansa BD
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">Última actualización de datos hace 1 hora</div>
                    <div class="h8 mb-0 font-weight-bold text-gray-600">clic en el símbolo para actualizar de nuevo</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-sync fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>`;  

    cardHistory.appendChild(div)

}


export const ViewDashboard = {
    showHeader,
    showFooter,
    showCardHistory,
    showCardBd
}