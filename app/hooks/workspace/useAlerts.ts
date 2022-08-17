import { useCallback, useEffect, useState } from "react";
import { isNode } from "react-flow-renderer10";
import { toast } from "react-toastify";
import { useTheme } from "@material-ui/core/styles";

const useAlerts = () => {
  const theme = useTheme();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertId, setAlertId] = useState<number | null>(null);

  const highlightAlertItems = (alert, constant = false) => {
    alert.elements.forEach(element => {
      let htmlNode;
      if (isNode(element)) {
        htmlNode = document.querySelector(`[data-id="${element.id}"]`);
      } else {
        htmlNode = document.querySelector(`.id_${element.id}`);
      }
      htmlNode.classList.add(constant ? "pulseConstant" : "pulse");
    });
  };

  const removeHighlightAlert = () => {
    Array.from(document.querySelectorAll(".pulse")).map(x =>
      x.classList.remove("pulse")
    );
    Array.from(document.querySelectorAll(".pulseConstant")).map(x =>
      x.classList.remove("pulseConstant")
    );
  };

  const handleAlerts = useCallback((_alerts, initial) => {
    if (initial) {
      setAlerts([..._alerts]);
    } else {
      const cleanAlertsString = alerts.map(alert =>
        alert.elements.map(x => x.id).join("")
      );
      const newAlerts = _alerts.filter(
        x => !cleanAlertsString.includes(x.elements.map(y => y.id).join(""))
      );

      removeHighlightAlert();

      newAlerts.forEach((alert, index) => {
        highlightAlertItems(alert);
        setAlerts(list => [...list, alert]);

        toast(alert.alert.label, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          toastId: alerts.length + index,
          style: {
            backgroundColor: theme.palette.primary.main,
            color: "white"
          },
          onClick: e => {
            setAlertId(Number(e.currentTarget.id));
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (alertId || alertId === 0) {
      setAlertOpen(true);
    }
  }, [alertId]);

  return {
    handleAlerts,
    alertId,
    alerts,
    setAlertId,
    highlightAlertItems,
    removeHighlightAlert,
    alertOpen,
    setAlertOpen
  };
};

export default useAlerts;
