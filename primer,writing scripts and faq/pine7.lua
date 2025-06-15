//@version=6
indicator("Logging levels demo", overlay = true)

// Display logs with all three logging levels in the Pine Logs pane on the first bar. 
if barstate.isfirst
    log.info("This is an 'info' message.")
    log.warning("This is a 'warning' message.")
    log.error("This is an 'error' message.")