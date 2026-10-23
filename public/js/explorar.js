function mostrarErro(error) {
    if (error.status === 401) {
        location.href = "login.html"
    } else {
        alert(error.message)
    }
}
 
async function load() {
    await api("/api/logado")
}
 
load().catch(mostrarErro);