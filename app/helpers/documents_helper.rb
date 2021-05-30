module DocumentsHelper

  def when_doc_post_goal_auto_update(goal_id)
    goal = Goal.find(goal_id)
		goal.level += params[:document][:add_level].to_i
		goal.doc_count += 1
		goal.stage_id = (goal.doc_count + 4) / 5
		goal.update_attributes(level: goal.level, doc_count: goal.doc_count, stage_id: goal.stage_id)
  end

  def when_doc_destroy_goal_auto_update(document_id)
    document = Document.find(document_id)
    goal = document.goal
    goal.level -= document.add_level
		goal.doc_count -= 1
		goal.stage_id = (goal.doc_count + 4) / 5
		goal.update_attributes(level: goal.level, doc_count: goal.doc_count, stage_id: goal.stage_id)
  end

  def doc_number(goal_id, document_id)
	  documents = Document.where(goal_id: goal_id)
	  id_index = documents.pluck(:id)
	  id_index.index(document_id) + 1
  end
end
