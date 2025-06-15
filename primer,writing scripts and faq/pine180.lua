//@version=6
indicator("Chart type", "", true)

chartTypeToString() =>
    string result = switch
        chart.is_standard   => "Standard"
        chart.is_heikinashi => "Heikin-Ashi"
        chart.is_kagi       => "Kagi"
        chart.is_linebreak  => "Line Break"
        chart.is_pnf        => "Point and Figure"
        chart.is_range      => "Range"
        chart.is_renko      => "Renko"

if barstate.islastconfirmedhistory
    var table display = table.new(position.bottom_right, 1, 1, bgcolor = chart.fg_color)
    table.cell(display, 0, 0, str.format("Chart type: {0}", chartTypeToString()), text_color = chart.bg_color)