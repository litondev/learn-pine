//@version=6
indicator("Simple alert demo", overlay = true)
// Create condition to trigger alert.
bool triggerCondition = close > close[1]
// Use `triggerCondition` for the `condition` parameter. 
// Define a title for the alert in the menu and a message to send with the alert. 
alertcondition(condition = triggerCondition, title = "Example `alertcondition` Alert", 
  message = "The example `alertcondition` alert was triggered.")
// Plot a shape when `triggerCondition` is true to visually mark where alerts occur.
plotshape(triggerCondition, "Trigger Condition", shape.xcross, color = color.fuchsia)