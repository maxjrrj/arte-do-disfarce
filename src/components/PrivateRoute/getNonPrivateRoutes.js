const getNonPrivateRoutes = () => {
    return [ "/", "/entrar", "/registro"]
}

export const isAllowedRoute = (path, role) => {

    var routes = { publicRoutes: ["/", "/registro", "/entrar"]}
    routes["003"] = ["/planos", ...routes.publicRoutes]
    routes["002"] = ["/admin/caixa", "/admin/servicos", ...routes["003"]]
    routes["001"] = ["/admin/relatorios", "/admin/usuarios", ...routes["002"]]
    
    return role == "000" ? true : routes[role].includes(path)
}



export default getNonPrivateRoutes;