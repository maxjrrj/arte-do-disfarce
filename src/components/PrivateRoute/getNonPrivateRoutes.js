const getNonPrivateRoutes = () => {
    return [ "/", "/entrar", "/registro"]
}

export const isAllowedRoute = (path, role) => {

    var routes = { publicRoutes: ["/", "/registro", "/entrar"]}
    routes["Client"] = ["/planos", ...routes.publicRoutes]
    routes["Employee"] = ["/admin/caixa", "/admin/servicos", ...routes["Client"]]
    routes["Manager"] = ["/admin/relatorios", "/admin/usuarios", "/admin/aprovacoes", ...routes["Employee"]]
    console.log(routes)
    console.log(role)
    return role == "Admin" ? true : routes[role].includes(path)
}



export default getNonPrivateRoutes;