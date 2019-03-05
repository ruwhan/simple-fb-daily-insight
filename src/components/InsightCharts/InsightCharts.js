import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DropDown from "../RightWeight/DropDown";
import { changeTimeIncrement, insightBreakDownChangeField, loadMoreBrokenDownInsight } from "../../actions/insightBreakDown";
import { fieldOptions } from "../../data/fieldOptions";

import "./InsightChart.css";

const timeOptions = [
  {
    value: '1',
    text: 'Daily'
  },
  {
    value: 'monthly',
    text: 'Monthly'
  }
];

const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 
  'SEP', 'OKT', 'NOV', 'DEC'];

class InsightCharts extends React.Component {

  static propTypes = {
    insightBreakDown: PropTypes.object,
    changeTimeIncrement: PropTypes.func.isRequired,
    loadMoreBrokenDownInsight: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.changeTimeIncrement = props.changeTimeIncrement;
    this.loadMoreBrokenDownInsight = props.loadMoreBrokenDownInsight;
    this.insightBreakDownChangeField = props.insightBreakDownChangeField;
  }


  /**
   * Build chart series.
   * 
   * @return {Object}
   */
  buildSeries = () => {
    const { insightBreakDown } = this.props;
    const { entities, parameters } = insightBreakDown;
    const { data } = entities;
    let seriesData, xAxisCategories, highchartOptions;

    if (data.length > 0) {
      seriesData = data.map((d) => {
        return {
          y: Number.parseInt(d[insightBreakDown.selectedField]),
          name: insightBreakDown.selectedField
        }
      });

      xAxisCategories = data.map((d) => {
        if (parameters.timeIncrement === 'monthly') {
          const date = new Date(d.date_start);
          return (`${monthName[date.getUTCMonth()]}-${date.getFullYear()}`);
        }

        return (`${d.date_start}`);
      });

      highchartOptions = {
        chart: {
          reflow: true,

          // events: {
          //   redraw: function () {
          //     console.log('chart redraw');
          //     var label = this.renderer.label('The chart was just redrawn', 100, 120)
          //         .attr({
          //             fill: Highcharts.getOptions().colors[0],
          //             padding: 10,
          //             r: 5,
          //             zIndex: 8
          //         })
          //         .css({
          //             color: '#FFFFFF'
          //         })
          //         .add();

          //     setTimeout(function () {
          //         label.fadeOut();
          //     }, 1000);
          //   }
          // }
        },
        title: 'Impressions',
        series: [
          {
            type: 'area',
            data: seriesData,
            name: insightBreakDown.selectedField,
          },
        ],
        xAxis: {
          categories: xAxisCategories,
        },
      };

      return highchartOptions;
    }

    return undefined;
  }

  /**
   * On change time increment event handler.
   */
  handleChangeTimeIncrement = (selectedValue) => {
    this.changeTimeIncrement(selectedValue);
  }

  /**
   * On change option fields event handler.
   */
  handleChangeOptionFields = (selectedValue) => {
    this.insightBreakDownChangeField({ selectedField: selectedValue });
  }

  /**
   * On click more event handler.
   */
  handleClickMore = (e) => {
    e.preventDefault();

    this.loadMoreBrokenDownInsight();
  }

  render = () => {
    const { insightBreakDown } = this.props;
    const highchartOptions = this.buildSeries();

    return (
      <div className="insight-chart">
        <div>
          <form>
            <div>
              <DropDown 
                options={ timeOptions }
                selectedValue={ insightBreakDown.parameters.timeIncrement }
                onChangeOption={ this.handleChangeTimeIncrement } />
            </div>
            <div>
              <DropDown
                options={ fieldOptions }
                selectedValue={ insightBreakDown.selectedField }
                onChangeOption={ this.handleChangeOptionFields }  
              />
            </div>
          </form>
          <button onClick={ this.handleClickMore } disabled={ !insightBreakDown.paging.next } >
            <i className="fas fa-long-arrow-alt-right"></i>
          </button>
        </div>
        <div style={{ height: '400px' }}>
          { (highchartOptions && !insightBreakDown.isLoading) && 
              <HighchartsReact highcharts={ Highcharts } options={ highchartOptions } /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  insightBreakDown: state.insightBreakDown
});

const mapActionToProps = {
  changeTimeIncrement,
  loadMoreBrokenDownInsight,
  insightBreakDownChangeField,
}

export default connect(mapStateToProps, mapActionToProps)(InsightCharts);
