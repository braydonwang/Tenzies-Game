export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  var pips = [];
  for (let i = 0; i < props.value; i++) {
    pips.push(<span key={i} className="pip"></span>);
  }

  return (
    <div
      className="die"
      style={styles}
      onClick={() => props.holdDice(props.id)}
    >
      {pips}
    </div>
  );
}
