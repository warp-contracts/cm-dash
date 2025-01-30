import type {Component} from "solid-js";
import claraImageUrl from "../assets/clara.png";

export const Navbar: Component = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 pb-2 pt-2">
            <div class="container-fluid">
                <a href="/agents" class="navbar-brand">
                    <img  src={claraImageUrl} alt="CLARA" width="60" height="60"/>
                </a>
                <a class="navbar-brand" href="/agents">
                    C.L.A.R.A. Dashboard
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/agents">Agents</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tasks">Tasks</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
