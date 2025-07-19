use axum::{http::StatusCode, response::Html, routing::get, Router};
use tokio::{fs::File, io::AsyncReadExt};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/front", get(get_front))
        .route("/data", get(get_data));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_front() -> (StatusCode, Html<String>) {
    let mut file = File::open("assets/front.html").await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();

    (StatusCode::OK, Html(contents))
}

async fn get_data() -> (StatusCode, String) {
    let mut file = File::open("mrds_data.csv").await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();

    (StatusCode::OK, contents)
}
