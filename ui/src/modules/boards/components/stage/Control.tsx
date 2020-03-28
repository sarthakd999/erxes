import { ChooseLabelWrapper } from 'modules/boards/styles/label';
import { ActionButton } from 'modules/boards/styles/stage';
import { IOptions, IStage, IStageRefetchParams } from 'modules/boards/types';
import Icon from 'modules/common/components/Icon';
import React, { Component } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Overlay from './Overlay';

type Props = {
  archiveItems: () => void;
  archiveList: () => void;
  options: IOptions;
  queryParams: any;
  stage: IStage;
  refetchStages: (params: IStageRefetchParams) => Promise<any>;
};

export default class Control extends Component<Props> {
  private overlayTrigger;

  onClosePopover = () => {
    this.overlayTrigger.hide();
  };

  render() {
    const {
      stage,
      archiveItems,
      options,
      archiveList,
      queryParams,
      refetchStages
    } = this.props;

    return (
      <ChooseLabelWrapper>
        <OverlayTrigger
          ref={overlayTrigger => {
            this.overlayTrigger = overlayTrigger;
          }}
          trigger="click"
          placement="bottom"
          rootClose={true}
          container={this}
          overlay={
            <Overlay
              options={options}
              queryParams={queryParams}
              stage={stage}
              refetchStages={refetchStages}
              archiveItems={archiveItems}
              onClosePopover={this.onClosePopover}
              archiveList={archiveList}
            />
          }
        >
          <ActionButton>
            <Icon icon="ellipsis-h" />
          </ActionButton>
        </OverlayTrigger>
      </ChooseLabelWrapper>
    );
  }
}