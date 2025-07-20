use axum::{http::StatusCode, response::Html, routing::get, Router};
use axum_extra::response::{Css, JavaScript};
use tokio::{fs::File, io::AsyncReadExt};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .route("/front", get(get_front))
        .route("/vis.js", get(get_vis_js))
        .route("/style.css", get(get_style_css))
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

async fn get_vis_js() -> (StatusCode, JavaScript<String>) {
    let mut file = File::open("assets/vis.js").await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();

    (StatusCode::OK, JavaScript(contents))
}

async fn get_style_css() -> (StatusCode, Css<String>) {
    let mut file = File::open("assets/style.css").await.unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.unwrap();

    (StatusCode::OK, Css(contents))
}

async fn get_data() -> (StatusCode, String) {
    if let Ok(mut file) = File::open("mrds_data.csv").await {
        let mut contents = String::new();
        file.read_to_string(&mut contents).await.unwrap();

        (StatusCode::OK, contents)
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, "error".to_string())
    }
}
