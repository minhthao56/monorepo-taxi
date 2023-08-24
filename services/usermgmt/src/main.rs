use actix_web::{get, web, App, HttpResponse, HttpServer, Responder, middleware::Logger};
// use reqwest;
use serde_json::json;

use database::db::Database;

#[get("/whoami")]
async fn whoami() -> impl Responder {
//    let res=  reqwest::get("http://communicatemgmt-service:7070/communicatemgmt/").await.unwrap();
//     println!("Status: {}", res.status());
//     println!("Headers:\n{:#?}", res.headers());

//     let body = res.text().await.unwrap();
//     println!("Body:\n{}", body);

    let s = String::from("whoami");

    HttpResponse::Ok().body(s)
}
#[get("/healthchecker")]
async fn health_checker_handler() -> impl Responder {
    const MESSAGE: &str = "Build Simple CRUD API with Rust, SQLX, Postgres,and Actix Web";

    HttpResponse::Ok().json(json!({"status": "success","message": MESSAGE}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = Database::new().await;
    println!("Listening on http://localhost:9090/usermgmt/");
    HttpServer::new(move|| {
        App::new()
        .app_data(web::Data::new(pool.clone()))
        .service(
            web::scope("/usermgmt")
                .service(whoami)
                .service(health_checker_handler),
        ).wrap(Logger::default())
    })
    .bind(("0.0.0.0", 9090))?
    .run()
    .await
}
