import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { globalRouter } from "@/utils/globalRouter"

export function RouterProvider() {
  const navigate = useNavigate()

  useEffect(() => {
    globalRouter.navigate = navigate
  }, [navigate])

  return null
}