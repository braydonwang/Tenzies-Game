export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <div
      className="die"
      style={styles}
      onClick={() => props.holdDice(props.id)}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
