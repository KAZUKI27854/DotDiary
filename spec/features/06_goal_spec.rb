require 'rails_helper'

describe '6.ユーザログイン後の目標関連のテスト', type: :feature, js: true do
  let!(:goal) { create(:goal) }
  let!(:user) { User.first }

  before do
    login_as(user, :scope => :user)
    visit  my_page_path
  end

  describe '目標作成前の目標メニューのテスト' do
    before do
      Goal.first.destroy
      visit current_path
      all('.my-page__menu--icon')[1].click
    end

    it '目標アイコンにバウンドアニメーションの為のクラスが追加されている' do
      goal_icon = find '.my-page__menu--icon--goal'
      expect(goal_icon['class']).to include 'js-bound'
    end
    it '目標アイコンをクリックすると目標メニューが表示される' do
      expect(page).to have_selector '.my-page__menu'
      expect(page).to have_content 'せっていする'
    end

    context '目標作成モーダルのテスト' do
      before do
        click_on 'せっていする'
      end

      it '目標メニューの「せっていする」をクリックすると目標作成モーダルが表示される' do
        expect(page).to have_selector '#modal-new-goal'
      end
      it 'カテゴリー入力フォームが表示される' do
        expect(page).to have_field 'goal[category]'
      end
      it '最終目標入力フォームが表示される' do
        expect(page).to have_field 'goal[goal_status]'
      end
      it '目標期限入力フォームが表示される' do
        expect(page).to have_field 'goal[deadline]'
      end
      it '目標作成成功のテスト' do
        fill_in 'goal[category]', with: Faker::Games::Pokemon.move
        fill_in 'goal[goal_status]', with: Faker::Games::Pokemon.move
        fill_in 'goal[deadline]', with: Date.today + 1
        click_on 'せってい'
        expect(page).to have_content 'もくひょうをついかしました'
        expect(Goal.count).to be 1
      end
      it '目標作成失敗のテスト' do
        fill_in 'goal[category]', with: ''
        fill_in 'goal[goal_status]', with: ''
        fill_in 'goal[deadline]', with: ''
        expect { click_on 'せってい' }.to change(Goal, :count).by(0)
        expect(page).to have_selector '.error__message'
      end
    end
  end

  describe '目標作成後の目標メニューのテスト' do
    before do
      visit my_page_path
      all('.my-page__menu--icon')[1].click
    end

    it '目標アイコンにバウンドアニメーションの為のクラスがない' do
      goal_icon = find '.my-page__menu--icon--goal'
      expect(goal_icon['class']).not_to include 'js-bound'
    end
    it '目標メニューに設定した目標のカテゴリーが表示されている' do
      expect(page).to have_content goal.category
    end
    it '設定した目標の、次の目標が「ぼうけんをきろくする」になっている' do
      expect(page).to have_content 'ぼうけんをきろくする'
    end
    it '「ぼうけんをきろくする」をクリックすると、ドキュメント作成モーダルが表示される' do
      click_on 'ぼうけんをきろくする'
      expect(page).to have_selector '#modal-new-doc'
    end

    context '目標が4つ以上ある場合' do
      before do
        create_list(:goal, 3, user_id: user.id)
        visit my_page_path
        all('.my-page__menu--icon')[1].click
      end

      it '目標メニューにセレクトボックスが表示されている' do
        expect(page).to have_selector '.js-menu-goal-select'
      end
      it 'セレクトボックスの目標をクリックすると、更新順に数えて4番目の目標の編集モーダルが表示される' do
        within '.js-menu-goal-select' do
          select goal.category
        end
        expect(page).to have_selector '#modal-goal' + goal.id.to_s + '-edit'
      end
    end

    context '目標編集モーダルのテスト' do
      before do
        click_on goal.category
      end

      it '目標のカテゴリーをクリックするとその目標の編集モーダルが表示される' do
        expect(page).to have_selector '#modal-goal' + goal.id.to_s + '-edit'
      end
      it '目標編集成功のテスト' do
        fill_in 'goal[category]', with: 'テスト'
        fill_in 'goal[goal_status]', with: 'テスト成功'
        click_on 'へんこう'
        expect(page).to have_content 'もくひょうをへんこうしました'
        expect(goal.reload.category).to eq 'テスト'
        expect(goal.reload.goal_status).to eq 'テスト成功'
      end
      it '目標編集失敗のテスト' do
        fill_in 'goal[category]', with: ''
        fill_in 'goal[goal_status]', with: ''
        click_on 'へんこう'
        expect(page).to have_selector '.error__message'
      end
      it '目標削除のテスト' do
        page.accept_confirm do
          click_on 'さくじょ'
        end
        expect(page).to have_content 'もくひょうをさくじょしました'
        expect(Goal.count).to eq 0
      end
    end

    context '目標期限通知のテスト' do
      let!(:goal_2) { create(:goal, user_id: user.id, deadline: Date.current + 4) }

      it '目標期限が3日後の場合、目標期限が近いという内容の通知が表示される' do
        goal.update(deadline: Date.current + 3)
        visit current_path
        expect(page).to have_content 'きげんが近いもくひょうが 1 つあります'
      end
      it '目標期限が2日後の場合、目標期限が近いという内容の通知が表示される' do
        goal.update(deadline: Date.current + 2)
        visit current_path
        expect(page).to have_content 'きげんが近いもくひょうが 1 つあります'
      end
      it '目標期限が翌日の場合、目標期限が近いという内容の通知が表示される' do
        goal.update(deadline: Date.current + 1)
        visit current_path
        expect(page).to have_content 'きげんが近いもくひょうが 1 つあります'
      end
      it '目標期限が当日を除く3日以内のものが複数ある場合、通知に反映される' do
        goal.update(deadline: Date.current + 3)
        goal_2.update(deadline: Date.current + 2)
        visit current_path
        expect(page).to have_content 'きげんが近いもくひょうが 2 つあります'
      end
      it '目標期限が当日の場合、目標期限が本日という内容の通知が表示される' do
        goal.deadline = Date.current
        goal.save(validate: false)
        visit current_path
        expect(page).to have_content 'きげんが本日のもくひょうが 1 つあります'
      end
      it '目標期限が当日のものが複数ある場合、通知に反映される' do
        goal.deadline = Date.current
        goal.save(validate: false)
        goal_2.deadline = Date.current
        goal_2.save(validate: false)
        visit current_path
        expect(page).to have_content 'きげんが本日のもくひょうが 2 つあります'
      end
      it '目標期限が昨日以前の場合、目標期限超過という内容の通知が表示される' do
        goal.deadline = Date.current - 1
        goal.save(validate: false)
        visit current_path
        expect(page).to have_content 'きげん切れのもくひょうが 1 つあるため、きげんを修正してください'
      end
      it '目標期限が昨日以前のものが複数ある場合、通知に反映される' do
        goal.deadline = Date.current - 1
        goal.save(validate: false)
        goal_2.deadline = Date.current - 1
        goal_2.save(validate: false)
        visit current_path
        expect(page).to have_content 'きげん切れのもくひょうが 2 つあるため、きげんを修正してください'
      end
    end
  end
end
