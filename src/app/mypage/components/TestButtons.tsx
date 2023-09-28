import { MypageButton } from '.';
interface TestButtonsProps {
  handleParticipatedTestsClick: () => void;
  handleCreatedTestsClick: () => void;
  isParticipatedTestsVisible: boolean;
  isCreatedTestsVisible: boolean;
}

const TestButtons: React.FC<TestButtonsProps> = ({
  handleParticipatedTestsClick,
  handleCreatedTestsClick,
  isParticipatedTestsVisible,
  isCreatedTestsVisible,
}) => {
  return (
    <div className="mt-5 flex-grow bg-slate-100 p-4">
      <MypageButton
        className="m-2 p-2"
        label="참여 테스트"
        onClick={handleParticipatedTestsClick}
        isActive={isParticipatedTestsVisible}
      />
      <MypageButton
        className="m-2 p-2"
        label="만든 테스트"
        onClick={handleCreatedTestsClick}
        isActive={isCreatedTestsVisible}
      />
    </div>
  );
};

export default TestButtons;
