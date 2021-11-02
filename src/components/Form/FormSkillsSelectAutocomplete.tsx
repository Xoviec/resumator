import {
  useState,
  VoidFunctionComponent,
  MouseEventHandler,
  ComponentClass,
  useMemo,
  useEffect,
} from "react";
import Select, {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from "react-select";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortEndHandler,
  SortableHandle,
} from "react-sortable-hoc";
import { useSkillsContext } from "../../context/SkillsContext/SkillsContext";

interface Skill {
  name: string;
}

interface FormSkillsSelectPropsAutocomplete {
  label?: string;
  value: Skill[];
  onChange: (skills: Skill[]) => void;
}

interface AutocompleteSkill {
  name: string;
  label: string;
  isNew: boolean;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
}

function arrayMove<T>(array: readonly T[], from: number, to: number) {
  const slicedArray = array.slice();
  slicedArray.splice(
    to < 0 ? array.length + to : to,
    0,
    slicedArray.splice(from, 1)[0]
  );
  return slicedArray;
}

const SortableMultiValue = SortableElement(
  (props: MultiValueProps<ColourOption[]>) => {
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  }
);

const SortableMultiValueLabel = SortableHandle((props: MultiValueGenericProps) => {
  return <components.MultiValueLabel {...props} />;
});

const SortableSelect = SortableContainer(Select) as ComponentClass<
  Props<ColourOption, true> & SortableContainerProps
>;

export const FormSkillsSelectAutocomplete: VoidFunctionComponent<FormSkillsSelectPropsAutocomplete> =
  ({ label, value, onChange: ch }) => {
    const { skillList, updateSkillList } = useSkillsContext();
    const [selected, setSelected] = useState<readonly ColourOption[]>([]);

    const onChange = (selectedOptions: OnChangeValue<ColourOption, true>) => {
      ch(selectedOptions.map((skill) => ({ name: skill.label })));
      setSelected(selectedOptions);
    };

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
      const newVal = arrayMove(selected, oldIndex, newIndex);
      ch(newVal.map((skill) => ({ name: skill.label })));
      setSelected(newVal);
    };

    const options = useMemo(() => {
      return skillList.map((skill) => ({
        value: skill,
        label: skill,
      }));
    }, [skillList]);

    useEffect(() => {
      if (value.length) {
        const selectedValues = value.map((skill) => ({
          value: skill.name,
          label: skill.name,
        }));

        setSelected(selectedValues);
      }
    }, [value]);

    // @ts-ignore
    return (
      <div style={{ width: "100%" }}>
        <SortableSelect
          useDragHandle
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          isMulti
          options={options}
          value={selected}
          menuPosition="fixed"
          onChange={onChange}
          components={{
            // @ts-ignore
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
          }}
          closeMenuOnSelect={false}
        />
      </div>
    );
  };
