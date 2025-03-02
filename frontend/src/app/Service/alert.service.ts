import Swal from "sweetalert2";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  success(message: string, title: string = "") {
    Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  error(message: string, title: string = "") {
    Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  warning(message: string, title: string = "") {
    Swal.fire({
      title,
      text: message,
      icon: "warning",
      confirmButtonColor: "#f39c12",
      confirmButtonText: "OK",
    });
  }

  info(message: string, title: string = "") {
    Swal.fire({
      title,
      text: message,
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  }

  confirm(message: string, title: string = ""): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => result.isConfirmed);
  }
}
